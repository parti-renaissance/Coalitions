import React, { FunctionComponent } from 'react';
import LegalPage from 'components/LegalPage';

import { ContentType } from 'components/LegalPage/LegalPage';

const contents = [
  {
    type: ContentType.TEXT,
    text:
      'La présente Politique d’utilisation des cookies a vocation à préciser les types de Cookies utilisés sur la Plateforme « Pour une Cause » éditée par La République en Marche (ci-après « LaREM ») et leurs finalités d’utilisation.',
  },
  {
    type: ContentType.ARTICLE_TITLE,
    text: 'ARTICLE 1.   DÉFINITIONS',
  },
  {
    type: ContentType.TEXT,
    text:
      'Cookies : désignent les fichiers texte non exécutables qui sont déposés et stockés par le serveur d’un site web sur le Terminal de l’Utilisateur de la Plateforme ;',
  },
  {
    type: ContentType.TEXT,
    text:
      'RGPD : désigne le Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016, relatif à la protection des personnes physique à l’égard du traitement des données à caractère personnel et à la libre circulation de ces données dit Règlement Général sur la Protection des Données ;',
  },
  {
    type: ContentType.TEXT,
    text:
      'Services : désignent l’ensemble des fonctionnalités et contenus accessibles sur la Plateforme ;',
  },
  {
    type: ContentType.TEXT,
    text:
      'Plateforme : désigne le site web « Pour une Cause » dédié à la création et l’animation de causes, déployée par LaREM et accessible à l’adresse url ___________ ;',
  },
  {
    type: ContentType.TEXT,
    text:
      'Terminal : désigne l’appareil par lequel l’Utilisateur navigue sur le web (ordinateur, smartphone, tablette etc.) ;',
  },
  {
    type: ContentType.TEXT,
    text:
      'Tiers : désignent les personnes physiques ou morales distinctes de LaREM dont la technologie est utilisée par la Plateforme ou vers lequel un lien est accessible sur la Plateforme ;',
  },
  {
    type: ContentType.TEXT,
    text:
      'Utilisateur : désigne toute personne accédant et/ou utilisant les Services de la Plateforme.',
  },
  {
    type: ContentType.ARTICLE_TITLE,
    text: 'ARTICLE 2.   À PROPOS DES COOKIES',
  },
  {
    type: ContentType.TEXT,
    text:
      'Lorsque l’Utilisateur visite la Plateforme, des Cookies peuvent être déposés sur son Terminal. Ces Cookies peuvent impliquer la transmission d’informations, soit entre lui et LaREM, soit à destination d’un tiers pour le compte de LaREM ou en accord avec la propre politique de protection de la vie privée de ces Tiers.',
  },
  {
    type: ContentType.ARTICLE_TITLE,
    text: 'ARTICLE 3.   FINALITÉS DES COOKIES UTILISÉS',
  },
  {
    type: ContentType.TEXT,
    text:
      'LaREM utilise divers types de Cookies pour mieux comprendre la façon dont les Visiteurs et Utilisateurs utilisent les Services proposés sur la Plateforme et ainsi améliorer le fonctionnement et les Services de la Plateforme. La mémorisation de Cookies sur le Terminal de l’Utilisateur permet à LaREM notamment de personnaliser la navigation de l’Utilisateur sur la Plateforme et de rendre sa prochaine visite plus agréable et intuitive.',
  },
  {
    type: ContentType.TEXT,
    text: 'Les Cookies émis sur cette Plateforme ont de multiples usages :',
  },
  {
    type: ContentType.SUB_SUB_TITLE,
    text: '3.1. Cookies strictement nécessaires à la Plateforme :',
  },
];

const CookiesPolicy: FunctionComponent = () => (
  <LegalPage titleKey="cookies_policy.title" contents={contents} />
);

export default CookiesPolicy;
