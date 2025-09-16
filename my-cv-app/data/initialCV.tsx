import { v4 as uuidv4 } from "uuid";
import { Block } from "./types";

export const initialBlocks: Block[] = [
  {
    id: uuidv4(),
    type: "header",
    content: { title: "Charles Pelong" },
    style: { size: "large", align: "center" },
  },
  {
    id: uuidv4(),
    type: "contact",
    content: {
      email: "charlespelong@gmail.com",
      phone: "+33 7 83 28 54 92",
      address: "31 Avenue de Verdun, 78290 Croissy-sur-Seine",
      linkedin: "https://fr.linkedin.com/in/charles-pelong-a68212246",
    },
  },
  {
    id: uuidv4(),
    type: "text",
    content: "Étudiant à IMT Atlantique à la recherche d'un stage de fin d'études à partir du 04/2026 dans le domaine de la science des données et de l'apprentissage automatique.",
  },
  {
    id: uuidv4(),
    type: "divider"
  },
  {
    id: uuidv4(),
    type: "section",
    content: { title: "FORMATIONS" },
    children: [
      {
        id: uuidv4(),
        type: "subsection",
        content: {
          title: "IMT Atlantique",
          subtitle: "Master : Data Science et Recherche Opérationnelle",
          period: "09/2022 -- 06/2025",
        },
        children: [
          { id: uuidv4(), type: "text", content: "#3 école d'ingénieurs française, d'après le Classement de l'Etudiant 2025" },
          { id: uuidv4(), type: "text", content: "Cours : Mathématiques appliquées, Statistiques, Probabilités, Machine Learning, Optimisation, Recherche opérationnelle, IA, Python, Java, Anglais" },
        ],
      },
      {
        id: uuidv4(),
        type: "subsection",
        content: {
          title: "Shanghai Jiao Tong University",
          subtitle: "Master en Informatique et Recherche Opérationnelle",
          period: "09/2022 -- 06/2025",
        },
        children: [
          { id: uuidv4(), type: "text", content: "#9 université mondiale en Computer Science, d'après le Classement de Shanghai 2025" },
          { id: uuidv4(), type: "text", content: "Cours : Deep Learning, Computer Vision, Machine Learning, Cloud Computing, Chinois" },
        ],
      },
      {
        id: uuidv4(),
        type: "subsection",
        content: {
          title: "Lycée Pasteur",
          subtitle: "Classes préparatoires scientifiques PCSI/PC (CPGE)",
          period: "09/2020 -- 07/2022",
        },
        children: [
          { id: uuidv4(), type: "text", content: "Formation intensive en Mathématiques, Physique, Chimie, Informatique, Français, Anglais" },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    type: "divider"
  },
  {
    id: uuidv4(),
    type: "section",
    content: { title: "EXPERIENCES PROFESSIONNELLES" },
    children: [
      {
        id: uuidv4(),
        type: "subsection",
        content: {
          title: "JCDecaux",
          subtitle: "Data Scientist",
          period: "11/2024 -- 05/2025",
        },
        children: [
          { id: uuidv4(), type: "text", content: "Stage de 6 mois au sein de la DataCorp, entité de JCDecaux développant des produits data" },
          { id: uuidv4(), type: "text", content: "Développement de solutions RAG (Retrieval-Augmented Generation) as-a-service (Python, AWS, Langchain). Création de copilotes IA à destination :" },
          { id: uuidv4(), type: "text", content: "• des commerciaux pour un accès rapide à des données ciblées et fiables du groupe pour l'élaboration de devis." },
          { id: uuidv4(), type: "text", content: "• de la direction financière permettant la création de tableaux de bord à partir du langage naturel basés sur les données du groupe." },
          { id: uuidv4(), type: "text", content: "Ces produits permettent de réduire drastiquement le temps de recherche et les frottements entre différentes entités du groupe." },
        ],
      },
      {
        id: uuidv4(),
        type: "subsection",
        content: {
          title: "Sopra Steria Next",
          subtitle: "Data Analyst / Data Engineer",
          period: "04/2024 -- 10/2024",
        },
        children: [
          { id: uuidv4(), type: "text", content: "Stage de 6 mois, mission de conseil orientée data pour le compte du Ministère de l'Intérieur" },
          { id: uuidv4(), type: "text", content: "Collecte et traitement de données incluant du web scraping et extraction depuis diverses sources (Python, Selenium)." },
          { id: uuidv4(), type: "text", content: "Création de pipelines de données pour automatiser l'intégration et le nettoyage (Python, Pandas, M/Power BI)." },
          { id: uuidv4(), type: "text", content: "Production de tableaux de bord et rapports automatisés pour suivre les indicateurs de performance (Power BI, Python)." },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    type: "divider"
  },
  {
    id: uuidv4(),
    type: "section",
    content: { title: "AUTRES EXPERIENCES" },
    children: [
      {
        id: uuidv4(),
        type: "subsection",
        content: {
          title: "Junior Atlantique – Timber Productions",
          subtitle: "Développeur logiciel",
          period: "05/2023 -- 10/2023",
        },
        children: [
          { id: uuidv4(), type: "text", content: "Développement complet d'une application de gestion et recherche de contacts clients (JavaScript)." },
          { id: uuidv4(), type: "text", content: "Vente de l'application pour 3 000€." },
        ],
      },
      {
        id: uuidv4(),
        type: "subsection",
        content: {
          title: "Reeverse Systems",
          subtitle: "Chef de projet",
          period: "09/2023 -- 01/2024",
        },
        children: [
          { id: uuidv4(), type: "text", content: "Projet académique de 4 mois avec Reeverse Systems, élaboration d'un simulateur pour démontrer l'efficacité de leur solution : réduction des déchets industriels et maximisation des rendements." },
          { id: uuidv4(), type: "text", content: "Conception d'un simulateur multi-objectifs pour la production industrielle (Python, Matplotlib) :" },
          { id: uuidv4(), type: "text", content: "• Génération de données aléatoires suivant différentes lois pour simuler plusieurs facteurs (nombre d'ouvriers, poids des déchets, etc.)." },
          { id: uuidv4(), type: "text", content: "• Création de fronts de Pareto et visualisation sous forme de graphes radar (Python, Matplotlib)." },
          { id: uuidv4(), type: "text", content: "• Clustering K-means sur le front de Pareto pour ne présenter que 5 solutions représentatives." },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    type: "divider"
  },
  {
    id: uuidv4(),
    type: "section",
    content: { title: "COMPETENCES, LANGUES ET ACTIVITES" },
    children: [
      { id: uuidv4(), type: "text", content: "Langues : Français (natif), Anglais (IELTS 7/9), Espagnol (A2), Allemand (A2)" },
      { id: uuidv4(), type: "text", content: "Programmation : Python (Pandas, Scikit-learn), SQL, GitHub, Java, JavaScript, M/Power BI" },
      { id: uuidv4(), type: "text", content: "Machine Learning : Kaggle competitions (stacking LGBM+CatBoost sur les prix de voitures d'occasion), étude de cas Roland Berger (cliniques dentaires)" },
      { id: uuidv4(), type: "text", content: "Sports : Judo, Rugby (capitaine et responsable de l'équipe de l'école)" },
      { id: uuidv4(), type: "text", content: "Bénévolat : Scouts (10 ans) + mission humanitaire (1 mois)" },
    ],
  },
];
