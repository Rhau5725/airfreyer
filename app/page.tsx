"use client";

import { useEffect, useMemo, useState } from "react";

type Recipe = {
  id: number;
  name: string;
  category: string;
  emoji: string;
  time: number;
  kcal: number;
  protein: number;
  temperature: number;
  ingredients: string[];
  steps: string[];
};

const collections = [
  {
    category: "Café",
    emoji: "🍳",
    baseTime: 10,
    names: [
      "Omelete caprese", "Pão de queijo proteico", "Cestinha de ovo e peito de peru",
      "Torrada francesa fit", "Bolo de banana e aveia", "Muffin de maçã e canela",
      "Granola crocante sem açúcar", "Crepioca recheada", "Ovo assado no abacate",
      "Pãozinho de batata-doce", "Wrap de ovo e espinafre", "Cookie de aveia matinal",
      "Mini quiche de alho-poró", "Tostada de ricota e tomate", "Bolo de cenoura individual",
      "Cestinha de tapioca", "Panqueca de cacau", "Scone integral de iogurte",
    ],
    staples: ["2 ovos ou 1 porção da massa indicada", "2 colheres de aveia ou tapioca", "Temperos naturais a gosto"],
  },
  {
    category: "Almoço",
    emoji: "🍗",
    baseTime: 18,
    names: [
      "Frango crocante com páprica", "Frango recheado com espinafre", "Filé suíno com mostarda",
      "Kafta leve de patinho", "Almôndega de frango", "Hambúrguer caseiro fit",
      "Tilápia com crosta de aveia", "Salmão com limão e dill", "Quibe assado proteico",
      "Abobrinha recheada com carne", "Berinjela à parmegiana fit", "Escondidinho de frango",
      "Tiras bovinas com cebola", "Lombo com ervas", "Frango xadrez crocante",
      "Bolinho de atum", "Rocambole de carne individual", "Coxa de frango sem pele",
    ],
    staples: ["150 g da proteína principal", "1 colher (chá) de azeite", "Alho, sal, limão e ervas"],
  },
  {
    category: "Lanches",
    emoji: "🥙",
    baseTime: 13,
    names: [
      "Chips de batata-doce", "Chips de abobrinha", "Bolinho de brócolis",
      "Nuggets de frango caseiros", "Dadinho de tapioca light", "Falafel rápido",
      "Croquete de mandioca e carne", "Palito de cenoura crocante", "Mini pizza de berinjela",
      "Pastel de wrap com ricota", "Bolinha de queijo fit", "Grão-de-bico crocante",
      "Enroladinho de abobrinha", "Toast de batata-doce", "Coxinha fit de frango",
      "Anéis de cebola com aveia", "Empadinha integral de palmito", "Nachos de tapioca",
    ],
    staples: ["1 xícara do ingrediente principal", "1 colher de farelo de aveia", "Páprica, sal e ervas"],
  },
  {
    category: "Jantar",
    emoji: "🐟",
    baseTime: 16,
    names: [
      "Camarão com alho e limão", "Peixe mediterrâneo", "Frango ao curry",
      "Cogumelo recheado", "Tofu oriental dourado", "Tomate recheado proteico",
      "Pimentão recheado com quinoa", "Espetinho de frango e legumes", "Abóbora com carne moída",
      "Tilápia picante", "Rolinhos de repolho", "Couve-flor gratinada light",
      "Suflê rápido de legumes", "Frango com crosta de gergelim", "Almôndega de lentilha",
      "Mini lasanha de abobrinha", "Salmão teriyaki light", "Omelete mediterrâneo",
    ],
    staples: ["1 porção de proteína ou legumes", "1 xícara de vegetais frescos", "Ervas, sal e pimenta"],
  },
  {
    category: "Doces",
    emoji: "🍫",
    baseTime: 11,
    names: [
      "Brownie proteico", "Banana caramelizada com canela", "Petit gâteau fit",
      "Cookie de pasta de amendoim", "Maçã assada com granola", "Pera com cacau",
      "Bolo de coco sem açúcar", "Cheesecake individual light", "Muffin de mirtilo",
      "Brigadeirão proteico", "Churros de pão integral", "Bombom de banana",
      "Bolo de limão com iogurte", "Crumble de frutas vermelhas", "Cookie de cacau e aveia",
      "Abacaxi dourado com coco", "Queijadinha fit", "Donut de banana e canela",
    ],
    staples: ["1 fruta ou porção da massa indicada", "1 colher de aveia ou cacau", "Canela e adoçante a gosto"],
  },
  {
    category: "Veggie",
    emoji: "🥦",
    baseTime: 15,
    names: [
      "Couve-flor crocante", "Tofu com páprica defumada", "Berinjela com tahine",
      "Abóbora cabotiá com alecrim", "Brócolis com alho", "Hambúrguer de lentilha",
      "Bolinho de quinoa", "Abobrinha com parmesão", "Cenoura hasselback",
      "Repolho assado com limão", "Vagem crocante com gergelim", "Batata rústica com ervas",
      "Mix de legumes oriental", "Tomate confit rápido", "Quiabo sequinho",
      "Almôndega de grão-de-bico", "Pimentão mediterrâneo", "Palmito pupunha gratinado",
    ],
    staples: ["2 xícaras de legumes ou grãos", "1 colher (chá) de azeite", "Ervas, sal e pimenta"],
  },
];

const recipes: Recipe[] = collections.flatMap((group, groupIndex) =>
  group.names.map((name, index) => {
    const time = group.baseTime + (index % 5);
    const temperature = index % 3 === 0 ? 180 : index % 3 === 1 ? 190 : 200;
    return {
      id: groupIndex * 18 + index + 1,
      name,
      category: group.category,
      emoji: group.emoji,
      time,
      temperature,
      kcal: 96 + ((groupIndex * 43 + index * 17) % 235),
      protein: 8 + ((groupIndex * 7 + index * 3) % 25),
      ingredients: group.staples,
      steps: [
        "Misture os ingredientes e tempere bem.",
        "Preaqueça a Air Fryer por 3 minutos.",
        `Distribua no cesto sem sobrepor e asse a ${temperature}°C por ${time} minutos.`,
        "Vire na metade do tempo e sirva douradinho.",
      ],
    };
  }),
);

const categories = ["Todos", ...collections.map((item) => item.category)];

export default function Home() {
  const [category, setCategory] = useState("Todos");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [view, setView] = useState<"inicio" | "salvos">("inicio");
  const [limit, setLimit] = useState(12);
  const [selected, setSelected] = useState<Recipe | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("air-fryer-fit-favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      window.localStorage.setItem("air-fryer-fit-favorites", JSON.stringify(next));
      return next;
    });
  };

  const filtered = useMemo(() => {
    const source = view === "salvos" ? recipes.filter((recipe) => favorites.includes(recipe.id)) : recipes;
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return source.filter(
      (recipe) =>
        (category === "Todos" || recipe.category === category) &&
        recipe.name.toLocaleLowerCase("pt-BR").includes(normalizedQuery),
    );
  }, [category, favorites, query, view]);

  const goToRecipes = () => document.querySelector("#receitas")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main>
      <header>
        <button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Voltar ao topo">
          <span>AF</span><b>AIR FRYER<br />FIT</b>
        </button>
        <span className="edition">EDIÇÃO 01</span>
      </header>

      {view === "inicio" && (
        <>
          <section className="hero">
            <div className="hero-copy">
              <small>SEU NOVO JEITO DE COMER BEM</small>
              <h1>CROCANTE.<br />LEVE. <em>FÁCIL.</em></h1>
              <button onClick={goToRecipes}>ABRIR RECEITAS <span>↓</span></button>
            </div>
            <div className="hero-food" aria-hidden="true"><span>🍗</span></div>
            <div className="recipe-stamp"><strong>+100</strong><span>RECEITAS</span></div>
          </section>
          <section className="stats" aria-label="Resumo do produto">
            <div><strong>108</strong><span>receitas</span></div>
            <div><strong>≤ 22</strong><span>minutos</span></div>
            <div><strong>100%</strong><span>Air Fryer</span></div>
          </section>
        </>
      )}

      <section className="content" id="receitas">
        <div className="section-title">
          <div><small>{view === "salvos" ? "SUA COLEÇÃO" : "ESCOLHA E PREPARE"}</small><h2>{view === "salvos" ? "Receitas salvas" : "Bora cozinhar?"}</h2></div>
          <span>{filtered.length}</span>
        </div>

        <label className="search">
          <span aria-hidden="true">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar receita..." aria-label="Buscar receita" />
          {query && <button onClick={() => setQuery("")} aria-label="Limpar busca">×</button>}
        </label>

        <div className="chips" aria-label="Categorias">
          {categories.map((item) => (
            <button key={item} className={category === item ? "active" : ""} onClick={() => { setCategory(item); setLimit(12); }}>{item}</button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <>
            <div className="grid">
              {filtered.slice(0, limit).map((recipe) => (
                <article key={recipe.id} onClick={() => setSelected(recipe)} tabIndex={0} onKeyDown={(event) => event.key === "Enter" && setSelected(recipe)}>
                  <div className={`food-art tone-${recipe.id % 3}`}>
                    <span>{recipe.emoji}</span><small>{recipe.category}</small>
                  </div>
                  <div className="card-copy">
                    <h3>{recipe.name}</h3>
                    <p><span>◷ {recipe.time} min</span><span>ϟ {recipe.kcal} kcal</span></p>
                  </div>
                  <button className={`heart ${favorites.includes(recipe.id) ? "liked" : ""}`} onClick={(event) => { event.stopPropagation(); toggleFavorite(recipe.id); }} aria-label="Salvar receita">
                    {favorites.includes(recipe.id) ? "♥" : "♡"}
                  </button>
                </article>
              ))}
            </div>
            {filtered.length > limit && <button className="more" onClick={() => setLimit((current) => current + 12)}>MOSTRAR MAIS <b>+12</b></button>}
          </>
        ) : (
          <div className="empty"><span>🍽️</span><h3>Nada por aqui</h3><p>{view === "salvos" ? "Salve suas favoritas no coração." : "Tente buscar outro ingrediente."}</p></div>
        )}
      </section>

      <nav aria-label="Navegação principal">
        <button className={view === "inicio" ? "current" : ""} onClick={() => { setView("inicio"); setCategory("Todos"); window.scrollTo({ top: 0, behavior: "smooth" }); }}><b>⌂</b><span>Início</span></button>
        <button className="nav-search" onClick={() => { setView("inicio"); goToRecipes(); }} aria-label="Ir para busca">⌕</button>
        <button className={view === "salvos" ? "current" : ""} onClick={() => { setView("salvos"); setCategory("Todos"); window.scrollTo({ top: 0, behavior: "smooth" }); }}><b>♡</b><span>Salvos</span></button>
      </nav>

      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <section onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={selected.name}>
            <div className={`modal-art tone-${selected.id % 3}`}>
              <button onClick={() => setSelected(null)} aria-label="Fechar">×</button>
              <span>{selected.emoji}</span><b>{selected.category}</b>
            </div>
            <div className="recipe-body">
              <div className="recipe-title"><div><small>RECEITA #{String(selected.id).padStart(3, "0")}</small><h2>{selected.name}</h2></div><button onClick={() => toggleFavorite(selected.id)} aria-label="Salvar receita">{favorites.includes(selected.id) ? "♥" : "♡"}</button></div>
              <div className="facts"><span><b>{selected.time}</b>min</span><span><b>{selected.kcal}</b>kcal</span><span><b>{selected.protein}g</b>proteína</span></div>
              <h4>INGREDIENTES</h4>
              <ul>{selected.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul>
              <h4>PREPARO</h4>
              <ol>{selected.steps.map((step) => <li key={step}>{step}</li>)}</ol>
              <button className="cook" onClick={() => setSelected(null)}>PRONTO, VOU FAZER! 🔥</button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
