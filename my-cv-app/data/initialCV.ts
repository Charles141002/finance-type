import { v4 as uuidv4 } from 'uuid'
import type { Block } from '../utils/types'

type BlockTemplate = Omit<Block, 'id' | 'children'> & {
  id?: string
  children?: BlockTemplate[]
}

const TEMPLATE: BlockTemplate[] = [
  {
    type: 'header',
    content: { title: 'Charles Pelong' },
    style: { size: 'large', align: 'center' },
  },
  {
    type: 'contact',
    content: {
      email: 'charlespelong@gmail.com',
      phone: '+33 7 83 28 54 92',
      address: '31 Avenue de Verdun, 78290 Croissy-sur-Seine',
      linkedin: '<a href="https://fr.linkedin.com/in/charles-pelong-a68212246">linkedin</a>',
    },
  },
  {
    type: 'text',
    content:
      "<em>Étudiant à IMT Atlantique à la recherche d’un <strong>stage de fin d’études</strong> à partir du <strong>04/2026</strong> dans le domaine de la <strong>science des données</strong> et de l'<strong>apprentissage automatique</strong>.</em>",
  },
  {
    type: 'divider',
  },
  {
    type: 'section',
    content: { title: 'FORMATIONS' },
    children: [
      {
        type: 'subsection',
        content: {
          title: 'IMT Atlantique — Master : Data Science et Recherche Opérationnelle',
          subtitle: '',
          period: '09/2022 -- 06/2025',
        },
        children: [
          {
            type: 'text',
            content:
              "• <strong>#3 école d’ingénieurs française</strong>, d'après le <a href=\"https://www.letudiant.fr/classements/classement-des-ecoles-d-ingenieurs.html\">\"Classement de l’Etudiant 2025\"</a><br/>• Cours : Mathématiques appliquées, Statistiques, Probabilités, Machine Learning, Optimisation, Recherche opérationnelle, IA, Python, Java, Anglais",
          },
        ],
      },
      {
        type: 'subsection',
        content: {
          title: 'Shanghai Jiao Tong University — Master en Informatique et Recherche Opérationnelle',
          subtitle: '',
          period: '09/2022 -- 06/2025',
        },
        children: [
          {
            type: 'text',
            content:
              "• <strong>#9 université mondiale</strong> en <strong>Computer Science</strong>, d'après le <a href=\"https://www.shanghairanking.com/rankings/gras/2024/RS0210\">\"Classement de Shanghai 2025\"</a><br/>• Cours : Deep Learning, Computer Vision, Machine Learning, Cloud Computing, Chinois",
          },
        ],
      },
      {
        type: 'subsection',
        content: {
          title: 'Lycée Pasteur — Classes préparatoires scientifiques PCSI/PC (CPGE)',
          subtitle: '',
          period: '09/2020 -- 07/2022',
        },
        children: [
          {
            type: 'text',
            content: '• Formation intensive en Mathématiques, Physique, Chimie, Informatique, Français, Anglais',
          },
        ],
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    type: 'section',
    content: { title: 'EXPERIENCES PROFESSIONNELLES' },
    children: [
      {
        type: 'subsection',
        content: {
          title: 'JCDecaux — Data Scientist',
          subtitle: '',
          period: '11/2024 -- 05/2025',
        },
        children: [
          {
            type: 'text',
            content: "<em>Stage de 6 mois au sein de la DataCorp, entité de JCDecaux développant des produits data</em>",
          },
          {
            type: 'text',
            content:
              "• Développement de solutions RAG (Retrieval-Augmented Generation) as-a-service (Python, AWS, Langchain). Création de <strong>copilotes IA</strong> à destination :<br/>• des commerciaux pour un accès rapide à des données ciblées et fiables du groupe pour l'<strong>élaboration de devis</strong>.<br/>• de la direction financière permettant la <strong>création de tableaux de bord à partir du langage naturel</strong> basés sur les données du groupe.",
          },
          {
            type: 'text',
            content:
              'Ces produits permettent de <strong>réduire drastiquement le temps</strong> de recherche et les frottements entre différentes entités du groupe.',
          },
        ],
      },
      {
        type: 'subsection',
        content: {
          title: 'Sopra Steria Next — Data Analyst / Data Engineer',
          subtitle: '',
          period: '04/2024 -- 10/2024',
        },
        children: [
          {
            type: 'text',
            content:
              "<em>Stage de 6 mois, mission de conseil orientée data pour le compte du Ministère de l’Intérieur</em>",
          },
          {
            type: 'text',
            content:
              "• Collecte et traitement de données incluant du <strong>web scraping</strong> et <strong>extraction</strong> depuis diverses sources (Python, Selenium).<br/>• Création de pipelines de données pour automatiser l’<strong>intégration</strong> et le <strong>nettoyage</strong> (Python, Pandas, M/Power BI).<br/>• Production de <strong>tableaux de bord</strong> et <strong>rapports automatisés</strong> pour suivre les indicateurs de performance (Power BI, Python).",
          },
        ],
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    type: 'section',
    content: { title: 'AUTRES EXPERIENCES' },
    children: [
      {
        type: 'subsection',
        content: {
          title: 'Junior Atlantique – Timber Productions — Développeur logiciel',
          subtitle: '',
          period: '05/2023 -- 10/2023',
        },
        children: [
          {
            type: 'text',
            content:
              "• Développement complet d’une application de gestion et recherche de contacts clients (JavaScript).<br/>• Vente de l’application pour <strong>3 000€</strong>.",
          },
        ],
      },
      {
        type: 'subsection',
        content: {
          title: 'Reeverse Systems — Chef de projet',
          subtitle: '',
          period: '09/2023 -- 01/2024',
        },
        children: [
          {
            type: 'text',
            content:
              "<em>Projet académique de 4 mois avec Reeverse Systems, élaboration d'un simulateur pour démontrer <br/> l’efficacité de leur solution : réduction des déchets industriels et maximisation des rendements.</em>",
          },
          {
            type: 'text',
            content:
              "• Conception d’un simulateur multi-objectifs pour la production industrielle (Python, Matplotlib) :<br/>• Génération de données aléatoires suivant différentes lois pour simuler plusieurs facteurs (nombre d’ouvriers, poids des déchets, etc.).<br/>• Création de <strong>fronts de Pareto</strong> et visualisation sous forme de <strong>graphes radar</strong> (Python, Matplotlib).<br/>• Clustering <strong>K-means</strong> sur le front de Pareto pour ne présenter que 5 solutions représentatives.",
          },
        ],
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    type: 'section',
    content: { title: 'COMPETENCES, LANGUES ET ACTIVITES' },
    children: [
      {
        type: 'text',
        content:
          '• Compétences : Python, TypeScript, SQL, Power BI, Machine Learning, Deep Learning, Optimisation, RAG, LangChain, AWS, Git<br/>• Langues : Français (natif), Anglais (C1), Chinois (B1)<br/>• Activités : Rugby (FFR), Piano, Mentorat étudiants',
      },
    ],
  },
]

const cloneBlocks = (templates: BlockTemplate[]): Block[] =>
  templates.map((template) => ({
    id: uuidv4(),
    type: template.type,
    content: template.content,
    style: template.style,
    children: template.children ? cloneBlocks(template.children) : undefined,
  }))

export const createInitialBlocks = (): Block[] => cloneBlocks(TEMPLATE)

export const initialBlocks: Block[] = createInitialBlocks()
