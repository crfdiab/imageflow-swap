import { LanguageCode } from '@/utils/languageUtils';
// Type definitions for translation structure
export type FAQQuestion = {
  question: string;
  answer: string;
};

export type FAQSection = {
  title: string;
  questions: {
    howMany: FAQQuestion;
    isFree: FAQQuestion;
    privacy: FAQQuestion;
    fileSize: FAQQuestion;
    quality: FAQQuestion;
    browsers: FAQQuestion;
  };
};

// Define the structure of our translations

// Define the structure of our translations
interface Translations {
  common: {
    tools: string;
    aboutUs: string;
    contactUs: string;
    home: string;
    privacyPolicy: string;
    termsOfService: string;
    dataProtection: string;
    relatedConverters: string;
    allFormats: string;
    searchFormats: string;
    noResults: string;
    convert: string;
    to: string;
    format: string;
    dragAndDrop: string;
    chooseFiles: string;
    uploadLimit: string;
    downloadAll: string;
    uploadDifferent: string;
    converting: string;
    waiting: string;
    download: string;
    original: string;
    converted: string;
    conversionStats: string;
    imagesSelected: string;
    totalSize: string;
    noReduction: string;
    footer: {
      aboutConvertify: string;
      popularConversions: string;
      quickLinks: string;
      contact: string;
      contactText: string;
      copyright: string;
      privacy: string;
      terms: string;
    };
  };
  pages: {
    home: {
      title: string;
      description: string;
      toolsTitle: string;
    };
    converter: {
      titleTemplate: string;
      descriptionTemplate: string;
      uploadText: string;
    };
    about: {
      title: string;
      description: string;
    };
    contact: {
      title: string;
      description: string;
    };
    privacy: {
      title: string;
      description: string;
    };
    terms: {
      title: string;
      description: string;
    };
    dataProtection: {
      title: string;
      description: string;
    };
    notFound: {
      title: string;
      description: string;
      goHome: string;
    };
  };
  faq: {
    title: string;
    questions: {
      howMany: {
        question: string;
        answer: string;
      };
      isFree: {
        question: string;
        answer: string;
      };
      privacy: {
        question: string;
        answer: string;
      };
      fileSize: {
        question: string;
        answer: string;
      };
      quality: {
        question: string;
        answer: string;
      };
      browsers: {
        question: string;
        answer: string;
      };
    };
  };
}

// English translations (base language)
const en: Translations = {
  common: {
  tools: "Tools",
  aboutUs: "About Us",
  contactUs: "Contact Us",
  home: "Home",
  privacyPolicy: "Privacy Policy",
  termsOfService: "Terms of Service",
  dataProtection: "Data Protection",
  relatedConverters: "Related Converters",
  allFormats: "All Available Conversion Formats",
  searchFormats: "Search formats...",
  noResults: "No conversion formats match your search.",
  convert: "Convert",
  to: "to",
  format: "format",
  dragAndDrop: "Drag and Drop Your Images Here",
  chooseFiles: "Choose Files",
  uploadLimit: "or click the button below to browse your files (up to 50 images at once)",
  downloadAll: "Download All",
  uploadDifferent: "Upload Different Images",
  converting: "Converting...",
  waiting: "Waiting for conversion...",
  download: "Download",
  original: "Original",
  converted: "Converted",
  conversionStats: "Converted {count} {count, plural, one {image} other {images}} in {time} seconds • Average size reduction: {reduction}",
  imagesSelected: "{count} {count, plural, one {image} other {images}} selected",
  totalSize: "Total size: {size} KB",
  noReduction: "no reduction",
  footer: {
  aboutConvertify: "About Convertify",
  popularConversions: "Popular Conversions",
  quickLinks: "Quick Links",
  contact: "Contact",
  contactText: "Have questions or feedback? We'd love to hear from you.",
  copyright: "© {year} Convertify. All rights reserved.",
  privacy: "Privacy",
  terms: "Terms",
  }
  },
  pages: {
  home: {
  title: "Free Online Image Format Conversion",
  description: "Convert between various image formats with our fast, free, and secure browser-based tools. Process up to 50 images at once with no upload required - all conversion happens right in your browser.",
  toolsTitle: "Free {format} Image Conversion Tools",
  },
  converter: {
  titleTemplate: "Convert {source} To {target} Free Online 50 Images Bulk In-Time - Convertify",
  descriptionTemplate: "Convert {source} images to {target} format online for free. Process up to 50 images at once with no upload required - all conversion happens in your browser for complete privacy.",
  uploadText: "Upload your {source} images and we'll convert them to {target} format with the highest quality and smallest file size. Process up to 50 files at once!",
  },
  about: {
  title: "About Us | Convertify",
  description: "Learn about Convertify, the free online image conversion tool that lets you convert up to 50 images at once with complete privacy and security.",
  },
  contact: {
  title: "Contact Us | Convertify",
  description: "Get in touch with the Convertify team. We welcome your feedback, questions, and suggestions about our free online image conversion tool.",
  },
  privacy: {
  title: "Privacy Policy | Convertify",
  description: "Convertify's Privacy Policy explains how we handle your data. We process all images locally in your browser, ensuring complete privacy and security.",
  },
  terms: {
  title: "Terms of Service | Convertify",
  description: "Read Convertify's Terms of Service. By using our free online image conversion tool, you agree to these terms and conditions.",
  },
  dataProtection: {
  title: "Data Protection | Convertify",
  description: "Learn how Convertify protects your data. Our browser-based image conversion tool processes all files locally, ensuring your images never leave your device.",
  },
  notFound: {
  title: "Page Not Found | Convertify",
  description: "The page you are looking for does not exist. It might have been moved or deleted.",
  goHome: "Go to Homepage",
  },
  },
  faq: {
  title: "Frequently Asked Questions",
  questions: {
  howMany: {
  question: "How many images can I convert at once?",
  answer: "Convertify allows you to convert up to 50 images simultaneously. Simply drag and drop your files or select them from your device, and our tool will process them all at once, saving you time and effort."
  },
  isFree: {
  question: "Is Convertify really free to use?",
  answer: "Yes, Convertify is completely free to use with no hidden fees or subscriptions. We don't limit the number of conversions or add watermarks to your images."
  },
  privacy: {
  question: "Are my images uploaded to your servers?",
  answer: "No. Convertify processes all images directly in your browser using client-side technologies. Your files never leave your device, ensuring complete privacy and security."
  },
  fileSize: {
  question: "What's the maximum file size I can convert?",
  answer: "You can convert images up to 10MB each, with a total batch size of up to 50 images per conversion. For larger files, you may need to compress them first."
  },
  quality: {
  question: "Will I lose image quality during conversion?",
  answer: "Convertify strives to maintain the highest possible quality during conversion. However, some format changes inherently involve quality adjustments. For example, converting from lossless (PNG) to lossy (JPEG) formats will involve some quality reduction. You can adjust quality settings for many formats."
  },
  browsers: {
  question: "Which browsers are supported?",
  answer: "Convertify works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your preferred browser."
  }
  }
  }
  };
  
  // Spanish translations
  const es: Translations = {
  common: {
  tools: "Herramientas",
  aboutUs: "Sobre Nosotros",
  contactUs: "Contáctenos",
  home: "Inicio",
  privacyPolicy: "Política de Privacidad",
  termsOfService: "Términos de Servicio",
  dataProtection: "Protección de Datos",
  relatedConverters: "Conversores Relacionados",
  allFormats: "Todos los Formatos de Conversión Disponibles",
  searchFormats: "Buscar formatos...",
  noResults: "Ningún formato de conversión coincide con tu búsqueda.",
  convert: "Convertir",
  to: "a",
  format: "formato",
  dragAndDrop: "Arrastra y Suelta tus Imágenes Aquí",
  chooseFiles: "Elegir Archivos",
  uploadLimit: "o haz clic en el botón para buscar tus archivos (hasta 50 imágenes a la vez)",
  downloadAll: "Descargar Todo",
  uploadDifferent: "Subir Imágenes Diferentes",
  converting: "Convirtiendo...",
  waiting: "Esperando conversión...",
  download: "Descargar",
  original: "Original",
  converted: "Convertido",
  conversionStats: "Convertido {count} {count, plural, one {imagen} other {imágenes}} en {time} segundos • Reducción de tamaño promedio: {reduction}",
  imagesSelected: "{count} {count, plural, one {imagen seleccionada} other {imágenes seleccionadas}}",
  totalSize: "Tamaño total: {size} KB",
  noReduction: "sin reducción",
  footer: {
  aboutConvertify: "Sobre Convertify",
  popularConversions: "Conversiones Populares",
  quickLinks: "Enlaces Rápidos",
  contact: "Contacto",
  contactText: "¿Tienes preguntas o comentarios? Nos encantaría saber de ti.",
  copyright: "© {year} Convertify. Todos los derechos reservados.",
  privacy: "Privacidad",
  terms: "Términos",
  }
  },
  pages: {
  home: {
  title: "Conversión de Formatos de Imagen en Línea Gratis",
  description: "Convierte entre varios formatos de imagen con nuestras herramientas rápidas, gratuitas y seguras basadas en navegador. Procesa hasta 50 imágenes a la vez sin necesidad de subir archivos - todo el procesamiento ocurre en tu navegador.",
  toolsTitle: "Herramientas Gratuitas de Conversión de Imágenes {format}",
  },
  converter: {
  titleTemplate: "Convertir {source} A {target} Gratis En Línea 50 Imágenes En Lote - Convertify",
  descriptionTemplate: "Convierte imágenes {source} a formato {target} en línea gratis. Procesa hasta 50 imágenes a la vez sin necesidad de subir archivos - toda la conversión ocurre en tu navegador para total privacidad.",
  uploadText: "Sube tus imágenes {source} y las convertiremos a formato {target} con la mejor calidad y el menor tamaño de archivo. ¡Procesa hasta 50 archivos a la vez!",
  },
  about: {
  title: "Sobre Nosotros | Convertify",
  description: "Conoce Convertify, la herramienta gratuita de conversión de imágenes en línea que te permite convertir hasta 50 imágenes a la vez con total privacidad y seguridad.",
  },
  contact: {
  title: "Contáctenos | Convertify",
  description: "Ponte en contacto con el equipo de Convertify. Agradecemos tus comentarios, preguntas y sugerencias sobre nuestra herramienta gratuita de conversión de imágenes en línea.",
  },
  privacy: {
  title: "Política de Privacidad | Convertify",
  description: "La Política de Privacidad de Convertify explica cómo manejamos tus datos. Procesamos todas las imágenes localmente en tu navegador, garantizando total privacidad y seguridad.",
  },
  terms: {
  title: "Términos de Servicio | Convertify",
  description: "Lee los Términos de Servicio de Convertify. Al usar nuestra herramienta gratuita de conversión de imágenes en línea, aceptas estos términos y condiciones.",
  },
  dataProtection: {
  title: "Protección de Datos | Convertify",
  description: "Conoce cómo Convertify protege tus datos. Nuestra herramienta de conversión de imágenes basada en navegador procesa todos los archivos localmente, asegurando que tus imágenes nunca salgan de tu dispositivo.",
  },
  notFound: {
  title: "Página No Encontrada | Convertify",
  description: "La página que estás buscando no existe. Es posible que haya sido movida o eliminada.",
  goHome: "Ir a la Página de Inicio",
  },
  },
  faq: {
  title: "Preguntas Frecuentes",
  questions: {
  howMany: {
  question: "¿Cuántas imágenes puedo convertir a la vez?",
  answer: "Convertify te permite convertir hasta 50 imágenes simultáneamente. Simplemente arrastra y suelta tus archivos o selecciónalos desde tu dispositivo, y nuestra herramienta los procesará todos a la vez, ahorrándote tiempo y esfuerzo."
  },
  isFree: {
  question: "¿Es Convertify realmente gratis?",
  answer: "Sí, Convertify es completamente gratuito sin tarifas ocultas ni suscripciones. No limitamos el número de conversiones ni agregamos marcas de agua a tus imágenes."
  },
  privacy: {
  question: "¿Mis imágenes se suben a sus servidores?",
  answer: "No. Convertify procesa todas las imágenes directamente en tu navegador usando tecnologías del lado del cliente. Tus archivos nunca salen de tu dispositivo, garantizando total privacidad y seguridad."
  },
  fileSize: {
  question: "¿Cuál es el tamaño máximo de archivo que puedo convertir?",
  answer: "Puedes convertir imágenes de hasta 10MB cada una, con un tamaño total de lote de hasta 50 imágenes por conversión. Para archivos más grandes, es posible que necesites comprimirlos primero."
  },
  quality: {
  question: "¿Perderé calidad de imagen durante la conversión?",
  answer: "Convertify se esfuerza por mantener la mayor calidad posible durante la conversión. Sin embargo, algunos cambios de formato implican inherentemente ajustes de calidad. Por ejemplo, convertir de formatos sin pérdida (PNG) a formatos con pérdida (JPEG) implicará cierta reducción de calidad. Puedes ajustar la configuración de calidad para muchos formatos."
  },
  browsers: {
  question: "¿Qué navegadores son compatibles?",
  answer: "Convertify funciona en todos los navegadores modernos, incluyendo Chrome, Firefox, Safari y Edge. Para la mejor experiencia, recomendamos usar la última versión de tu navegador preferido."
  }
  }
  }
  };
  
  // French translations (placeholder)
  export const frPlaceholder: Translations = {
  ...en,
  common: {
  ...en.common,
  tools: "Outils",
  aboutUs: "À propos de nous",
  contactUs: "Contactez-nous",
  home: "Accueil",
  privacyPolicy: "Politique de confidentialité",
  termsOfService: "Conditions d'utilisation",
  dataProtection: "Protection des données",
  relatedConverters: "Convertisseurs associés",
  allFormats: "Tous les formats de conversion disponibles",
  searchFormats: "Rechercher des formats...",
  noResults: "Aucun format de conversion ne correspond à votre recherche.",
  convert: "Convertir",
  to: "en",
  format: "format",
  },
  pages: {
  ...en.pages,
  home: {
  ...en.pages.home,
  title: "Conversion de formats d'image en ligne gratuite",
  description: "Convertissez entre différents formats d'image avec nos outils rapides, gratuits et sécurisés basés sur navigateur.",
  }
  }
  };

// French translations
const fr: Translations = {
  common: {
    tools: "Outils",
    aboutUs: "À propos de nous",
    contactUs: "Contactez-nous",
    home: "Accueil",
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions d'utilisation",
    dataProtection: "Protection des données",
    relatedConverters: "Convertisseurs associés",
    allFormats: "Tous les formats de conversion disponibles",
    searchFormats: "Rechercher des formats...",
    noResults: "Aucun format de conversion ne correspond à votre recherche.",
    convert: "Convertir",
    to: "en",
    format: "format",
    dragAndDrop: "Glissez et déposez vos images ici",
    chooseFiles: "Choisir des fichiers",
    uploadLimit: "ou cliquez sur le bouton ci-dessous pour parcourir vos fichiers (jusqu'à 50 images à la fois)",
    downloadAll: "Tout télécharger",
    uploadDifferent: "Télécharger des images différentes",
    converting: "Conversion en cours...",
    waiting: "En attente de conversion...",
    download: "Télécharger",
    original: "Original",
    converted: "Converti",
    conversionStats: "Converti {count} {count, plural, one {image} other {images}} en {time} secondes • Réduction moyenne de taille : {reduction}",
    imagesSelected: "{count} {count, plural, one {image sélectionnée} other {images sélectionnées}}",
    totalSize: "Taille totale : {size} Ko",
    noReduction: "pas de réduction",
    footer: {
      aboutConvertify: "À propos de Convertify",
      popularConversions: "Conversions populaires",
      quickLinks: "Liens rapides",
      contact: "Contact",
      contactText: "Des questions ou des commentaires ? Nous aimerions avoir de vos nouvelles.",
      copyright: "© {year} Convertify. Tous droits réservés.",
      privacy: "Confidentialité",
      terms: "Conditions",
    }
  },
  pages: {
    home: {
      title: "Conversion de formats d'image en ligne gratuite",
      description: "Convertissez entre différents formats d'image avec nos outils rapides, gratuits et sécurisés basés sur navigateur. Traitez jusqu'à 50 images à la fois sans téléchargement requis - toute la conversion se fait directement dans votre navigateur.",
      toolsTitle: "Outils gratuits de conversion d'images {format}",
    },
    converter: {
      titleTemplate: "Convertir {source} en {target} gratuitement en ligne 50 images en lot - Convertify",
      descriptionTemplate: "Convertissez des images {source} au format {target} en ligne gratuitement. Traitez jusqu'à 50 images à la fois sans téléchargement requis - toute la conversion se fait dans votre navigateur pour une confidentialité totale.",
      uploadText: "Téléchargez vos images {source} et nous les convertirons au format {target} avec la meilleure qualité et la plus petite taille de fichier. Traitez jusqu'à 50 fichiers à la fois !",
    },
    about: {
      title: "À propos de nous | Convertify",
      description: "Découvrez Convertify, l'outil gratuit de conversion d'images en ligne qui vous permet de convertir jusqu'à 50 images à la fois en toute confidentialité et sécurité.",
    },
    contact: {
      title: "Contactez-nous | Convertify",
      description: "Contactez l'équipe Convertify. Nous accueillons vos commentaires, questions et suggestions concernant notre outil gratuit de conversion d'images en ligne.",
    },
    privacy: {
      title: "Politique de confidentialité | Convertify",
      description: "La politique de confidentialité de Convertify explique comment nous gérons vos données. Nous traitons toutes les images localement dans votre navigateur, assurant une confidentialité et une sécurité totales.",
    },
    terms: {
      title: "Conditions d'utilisation | Convertify",
      description: "Lisez les conditions d'utilisation de Convertify. En utilisant notre outil gratuit de conversion d'images en ligne, vous acceptez ces termes et conditions.",
    },
    dataProtection: {
      title: "Protection des données | Convertify",
      description: "Découvrez comment Convertify protège vos données. Notre outil de conversion d'images basé sur navigateur traite tous les fichiers localement, garantissant que vos images ne quittent jamais votre appareil.",
    },
    notFound: {
      title: "Page non trouvée | Convertify",
      description: "La page que vous recherchez n'existe pas. Elle a peut-être été déplacée ou supprimée.",
      goHome: "Aller à la page d'accueil",
    },
  },
  faq: {
    title: "Questions fréquemment posées",
    questions: {
      howMany: {
        question: "Combien d'images puis-je convertir à la fois ?",
        answer: "Convertify vous permet de convertir jusqu'à 50 images simultanément. Il suffit de glisser-déposer vos fichiers ou de les sélectionner depuis votre appareil, et notre outil les traitera tous en même temps, vous faisant gagner du temps et des efforts."
      },
      isFree: {
        question: "Convertify est-il vraiment gratuit ?",
        answer: "Oui, Convertify est totalement gratuit sans frais cachés ni abonnements. Nous ne limitons pas le nombre de conversions et n'ajoutons pas de filigranes à vos images."
      },
      privacy: {
        question: "Mes images sont-elles téléchargées sur vos serveurs ?",
        answer: "Non. Convertify traite toutes les images directement dans votre navigateur en utilisant des technologies côté client. Vos fichiers ne quittent jamais votre appareil, assurant une confidentialité et une sécurité totales."
      },
      fileSize: {
        question: "Quelle est la taille maximale de fichier que je peux convertir ?",
        answer: "Vous pouvez convertir des images jusqu'à 10 Mo chacune, avec une taille totale de lot allant jusqu'à 50 images par conversion. Pour les fichiers plus volumineux, vous devrez peut-être les comprimer d'abord."
      },
      quality: {
        question: "Vais-je perdre en qualité d'image pendant la conversion ?",
        answer: "Convertify s'efforce de maintenir la plus haute qualité possible pendant la conversion. Cependant, certains changements de format impliquent intrinsèquement des ajustements de qualité. Par exemple, la conversion de formats sans perte (PNG) vers des formats avec perte (JPEG) impliquera une certaine réduction de la qualité. Vous pouvez ajuster les paramètres de qualité pour de nombreux formats."
      },
      browsers: {
        question: "Quels navigateurs sont pris en charge ?",
        answer: "Convertify fonctionne sur tous les navigateurs modernes, y compris Chrome, Firefox, Safari et Edge. Pour une meilleure expérience, nous recommandons d'utiliser la dernière version de votre navigateur préféré."
      }
    }
  }
};

// German translations
const de: Translations = {
  common: {
    tools: "Werkzeuge",
    aboutUs: "Über uns",
    contactUs: "Kontakt",
    home: "Startseite",
    privacyPolicy: "Datenschutzrichtlinie",
    termsOfService: "Nutzungsbedingungen",
    dataProtection: "Datenschutz",
    relatedConverters: "Verwandte Konverter",
    allFormats: "Alle verfügbaren Konvertierungsformate",
    searchFormats: "Formate suchen...",
    noResults: "Keine Konvertierungsformate entsprechen Ihrer Suche.",
    convert: "Konvertieren",
    to: "zu",
    format: "Format",
    dragAndDrop: "Ziehen Sie Ihre Bilder hierher",
    chooseFiles: "Dateien auswählen",
    uploadLimit: "oder klicken Sie auf die Schaltfläche unten, um Ihre Dateien zu durchsuchen (bis zu 50 Bilder auf einmal)",
    downloadAll: "Alle herunterladen",
    uploadDifferent: "Andere Bilder hochladen",
    converting: "Konvertierung läuft...",
    waiting: "Warten auf Konvertierung...",
    download: "Herunterladen",
    original: "Original",
    converted: "Konvertiert",
    conversionStats: "{count} {count, plural, one {Bild} other {Bilder}} in {time} Sekunden konvertiert • Durchschnittliche Größenreduzierung: {reduction}",
    imagesSelected: "{count} {count, plural, one {Bild ausgewählt} other {Bilder ausgewählt}}",
    totalSize: "Gesamtgröße: {size} KB",
    noReduction: "keine Reduzierung",
    footer: {
      aboutConvertify: "Über Convertify",
      popularConversions: "Beliebte Konvertierungen",
      quickLinks: "Schnellzugriff",
      contact: "Kontakt",
      contactText: "Haben Sie Fragen oder Feedback? Wir würden gerne von Ihnen hören.",
      copyright: "© {year} Convertify. Alle Rechte vorbehalten.",
      privacy: "Datenschutz",
      terms: "Bedingungen",
    }
  },
  pages: {
    home: {
      title: "Kostenlose Online-Bildformatkonvertierung",
      description: "Konvertieren Sie zwischen verschiedenen Bildformaten mit unseren schnellen, kostenlosen und sicheren browserbasierten Tools. Verarbeiten Sie bis zu 50 Bilder gleichzeitig ohne Upload - die gesamte Konvertierung findet direkt in Ihrem Browser statt.",
      toolsTitle: "Kostenlose {format} Bildkonvertierungs-Tools",
    },
    converter: {
      titleTemplate: "Konvertieren Sie {source} zu {target} kostenlos online 50 Bilder im Stapel - Convertify",
      descriptionTemplate: "Konvertieren Sie {source}-Bilder kostenlos online in das {target}-Format. Verarbeiten Sie bis zu 50 Bilder gleichzeitig ohne Upload - die gesamte Konvertierung findet in Ihrem Browser statt für vollständige Privatsphäre.",
      uploadText: "Laden Sie Ihre {source}-Bilder hoch und wir konvertieren sie in das {target}-Format mit höchster Qualität und kleinster Dateigröße. Verarbeiten Sie bis zu 50 Dateien gleichzeitig!",
    },
    about: {
      title: "Über uns | Convertify",
      description: "Erfahren Sie mehr über Convertify, das kostenlose Online-Bildkonvertierungstool, mit dem Sie bis zu 50 Bilder gleichzeitig mit vollständiger Privatsphäre und Sicherheit konvertieren können.",
    },
    contact: {
      title: "Kontakt | Convertify",
      description: "Kontaktieren Sie das Convertify-Team. Wir freuen uns über Ihr Feedback, Ihre Fragen und Vorschläge zu unserem kostenlosen Online-Bildkonvertierungstool.",
    },
    privacy: {
      title: "Datenschutzrichtlinie | Convertify",
      description: "Die Datenschutzrichtlinie von Convertify erklärt, wie wir mit Ihren Daten umgehen. Wir verarbeiten alle Bilder lokal in Ihrem Browser und gewährleisten so vollständige Privatsphäre und Sicherheit.",
    },
    terms: {
      title: "Nutzungsbedingungen | Convertify",
      description: "Lesen Sie die Nutzungsbedingungen von Convertify. Durch die Nutzung unseres kostenlosen Online-Bildkonvertierungstools stimmen Sie diesen Bedingungen zu.",
    },
    dataProtection: {
      title: "Datenschutz | Convertify",
      description: "Erfahren Sie, wie Convertify Ihre Daten schützt. Unser browserbasiertes Bildkonvertierungstool verarbeitet alle Dateien lokal und stellt sicher, dass Ihre Bilder Ihr Gerät nie verlassen.",
    },
    notFound: {
      title: "Seite nicht gefunden | Convertify",
      description: "Die gesuchte Seite existiert nicht. Sie wurde möglicherweise verschoben oder gelöscht.",
      goHome: "Zur Startseite",
    },
  },
  faq: {
    title: "Häufig gestellte Fragen",
    questions: {
      howMany: {
        question: "Wie viele Bilder kann ich gleichzeitig konvertieren?",
        answer: "Mit Convertify können Sie bis zu 50 Bilder gleichzeitig konvertieren. Ziehen Sie einfach Ihre Dateien per Drag & Drop oder wählen Sie sie von Ihrem Gerät aus, und unser Tool verarbeitet sie alle auf einmal, was Ihnen Zeit und Mühe spart."
      },
      isFree: {
        question: "Ist Convertify wirklich kostenlos?",
        answer: "Ja, Convertify ist völlig kostenlos ohne versteckte Gebühren oder Abonnements. Wir begrenzen weder die Anzahl der Konvertierungen noch fügen wir Wasserzeichen zu Ihren Bildern hinzu."
      },
      privacy: {
        question: "Werden meine Bilder auf Ihre Server hochgeladen?",
        answer: "Nein. Convertify verarbeitet alle Bilder direkt in Ihrem Browser mit Client-seitigen Technologien. Ihre Dateien verlassen nie Ihr Gerät und gewährleisten so vollständige Privatsphäre und Sicherheit."
      },
      fileSize: {
        question: "Was ist die maximale Dateigröße, die ich konvertieren kann?",
        answer: "Sie können Bilder bis zu 10 MB pro Datei konvertieren, mit einer Gesamtbatchgröße von bis zu 50 Bildern pro Konvertierung. Für größere Dateien müssen Sie diese möglicherweise zuerst komprimieren."
      },
      quality: {
        question: "Verliere ich Bildqualität während der Konvertierung?",
        answer: "Convertify bemüht sich, die höchstmögliche Qualität während der Konvertierung beizubehalten. Allerdings beinhalten einige Formatänderungen naturgemäß Qualitätsanpassungen. Zum Beispiel wird die Konvertierung von verlustfreien (PNG) zu verlustbehafteten (JPEG) Formaten zu einer gewissen Qualitätsreduzierung führen. Sie können die Qualitätseinstellungen für viele Formate anpassen."
      },
      browsers: {
        question: "Welche Browser werden unterstützt?",
        answer: "Convertify funktioniert auf allen modernen Browsern einschließlich Chrome, Firefox, Safari und Edge. Für die beste Erfahrung empfehlen wir die Verwendung der neuesten Version Ihres bevorzugten Browsers."
      }
    }
  }
};

// Italian translations
const it: Translations = {
  common: {
    tools: "Strumenti",
    aboutUs: "Chi siamo",
    contactUs: "Contattaci",
    home: "Home",
    privacyPolicy: "Informativa sulla privacy",
    termsOfService: "Termini di servizio",
    dataProtection: "Protezione dei dati",
    relatedConverters: "Convertitori correlati",
    allFormats: "Tutti i formati di conversione disponibili",
    searchFormats: "Cerca formati...",
    noResults: "Nessun formato di conversione corrisponde alla tua ricerca.",
    convert: "Converti",
    to: "in",
    format: "formato",
    dragAndDrop: "Trascina e rilascia le tue immagini qui",
    chooseFiles: "Scegli file",
    uploadLimit: "o clicca il pulsante qui sotto per sfogliare i tuoi file (fino a 50 immagini alla volta)",
    downloadAll: "Scarica tutto",
    uploadDifferent: "Carica immagini diverse",
    converting: "Conversione in corso...",
    waiting: "In attesa di conversione...",
    download: "Scarica",
    original: "Originale",
    converted: "Convertito",
    conversionStats: "Convertite {count} {count, plural, one {immagine} other {immagini}} in {time} secondi • Riduzione media dimensione: {reduction}",
    imagesSelected: "{count} {count, plural, one {immagine selezionata} other {immagini selezionate}}",
    totalSize: "Dimensione totale: {size} KB",
    noReduction: "nessuna riduzione",
    footer: {
      aboutConvertify: "Chi è Convertify",
      popularConversions: "Conversioni popolari",
      quickLinks: "Link rapidi",
      contact: "Contatto",
      contactText: "Hai domande o feedback? Ci piacerebbe sentire la tua opinione.",
      copyright: "© {year} Convertify. Tutti i diritti riservati.",
      privacy: "Privacy",
      terms: "Termini",
    }
  },
  pages: {
    home: {
      title: "Conversione gratuita di formati immagine online",
      description: "Converti tra vari formati di immagine con i nostri strumenti veloci, gratuiti e sicuri basati sul browser. Elabora fino a 50 immagini alla volta senza necessità di caricamento - tutta la conversione avviene direttamente nel tuo browser.",
      toolsTitle: "Strumenti gratuiti di conversione immagini {format}",
    },
    converter: {
      titleTemplate: "Converti {source} in {target} gratuitamente online 50 immagini in batch - Convertify",
      descriptionTemplate: "Converti immagini {source} in formato {target} online gratuitamente. Elabora fino a 50 immagini alla volta senza necessità di caricamento - tutta la conversione avviene nel tuo browser per la massima privacy.",
      uploadText: "Carica le tue immagini {source} e le convertiremo in formato {target} con la migliore qualità e la dimensione file più piccola. Elabora fino a 50 file alla volta!",
    },
    about: {
      title: "Chi siamo | Convertify",
      description: "Scopri Convertify, lo strumento gratuito di conversione immagini online che ti permette di convertire fino a 50 immagini alla volta con completa privacy e sicurezza.",
    },
    contact: {
      title: "Contattaci | Convertify",
      description: "Contatta il team di Convertify. Apprezziamo il tuo feedback, le tue domande e i suggerimenti sul nostro strumento gratuito di conversione immagini online.",
    },
    privacy: {
      title: "Informativa sulla privacy | Convertify",
      description: "L'informativa sulla privacy di Convertify spiega come gestiamo i tuoi dati. Elaboriamo tutte le immagini localmente nel tuo browser, garantendo completa privacy e sicurezza.",
    },
    terms: {
      title: "Termini di servizio | Convertify",
      description: "Leggi i termini di servizio di Convertify. Utilizzando il nostro strumento gratuito di conversione immagini online, accetti questi termini e condizioni.",
    },
    dataProtection: {
      title: "Protezione dei dati | Convertify",
      description: "Scopri come Convertify protegge i tuoi dati. Il nostro strumento di conversione immagini basato su browser elabora tutti i file localmente, assicurando che le tue immagini non lascino mai il tuo dispositivo.",
    },
    notFound: {
      title: "Pagina non trovata | Convertify",
      description: "La pagina che stai cercando non esiste. Potrebbe essere stata spostata o eliminata.",
      goHome: "Vai alla homepage",
    },
  },
  faq: {
    title: "Domande frequenti",
    questions: {
      howMany: {
        question: "Quante immagini posso convertire contemporaneamente?",
        answer: "Convertify ti permette di convertire fino a 50 immagini contemporaneamente. Basta trascinare e rilasciare i tuoi file o selezionarli dal tuo dispositivo, e il nostro strumento li elaborerà tutti in una volta, risparmiando tempo e fatica."
      },
      isFree: {
        question: "Convertify è davvero gratuito?",
        answer: "Sì, Convertify è completamente gratuito senza costi nascosti o abbonamenti. Non limitiamo il numero di conversioni né aggiungiamo filigrane alle tue immagini."
      },
      privacy: {
        question: "Le mie immagini vengono caricate sui vostri server?",
        answer: "No. Convertify elabora tutte le immagini direttamente nel tuo browser utilizzando tecnologie lato client. I tuoi file non lasciano mai il tuo dispositivo, garantendo completa privacy e sicurezza."
      },
      fileSize: {
        question: "Qual è la dimensione massima del file che posso convertire?",
        answer: "Puoi convertire immagini fino a 10MB ciascuna, con una dimensione totale del batch fino a 50 immagini per conversione. Per file più grandi, potrebbe essere necessario comprimerli prima."
      },
      quality: {
        question: "Perderò qualità dell'immagine durante la conversione?",
        answer: "Convertify si impegna a mantenere la massima qualità possibile durante la conversione. Tuttavia, alcuni cambiamenti di formato comportano intrinsecamente aggiustamenti della qualità. Ad esempio, la conversione da formati senza perdita (PNG) a formati con perdita (JPEG) comporterà una certa riduzione della qualità. Puoi regolare le impostazioni di qualità per molti formati."
      },
      browsers: {
        question: "Quali browser sono supportati?",
        answer: "Convertify funziona su tutti i browser moderni inclusi Chrome, Firefox, Safari ed Edge. Per la migliore esperienza, raccomandiamo di utilizzare l'ultima versione del tuo browser preferito."
      }
    }
  }
};

// Portuguese translations
const pt: Translations = {
  common: {
    tools: "Ferramentas",
    aboutUs: "Sobre nós",
    contactUs: "Contate-nos",
    home: "Início",
    privacyPolicy: "Política de privacidade",
    termsOfService: "Termos de serviço",
    dataProtection: "Proteção de dados",
    relatedConverters: "Conversores relacionados",
    allFormats: "Todos os formatos de conversão disponíveis",
    searchFormats: "Pesquisar formatos...",
    noResults: "Nenhum formato de conversão corresponde à sua pesquisa.",
    convert: "Converter",
    to: "para",
    format: "formato",
    dragAndDrop: "Arraste e solte suas imagens aqui",
    chooseFiles: "Escolher arquivos",
    uploadLimit: "ou clique no botão abaixo para navegar em seus arquivos (até 50 imagens por vez)",
    downloadAll: "Baixar tudo",
    uploadDifferent: "Carregar imagens diferentes",
    converting: "Convertendo...",
    waiting: "Aguardando conversão...",
    download: "Baixar",
    original: "Original",
    converted: "Convertido",
    conversionStats: "Convertidas {count} {count, plural, one {imagem} other {imagens}} em {time} segundos • Redução média de tamanho: {reduction}",
    imagesSelected: "{count} {count, plural, one {imagem selecionada} other {imagens selecionadas}}",
    totalSize: "Tamanho total: {size} KB",
    noReduction: "sem redução",
    footer: {
      aboutConvertify: "Sobre o Convertify",
      popularConversions: "Conversões populares",
      quickLinks: "Links rápidos",
      contact: "Contato",
      contactText: "Tem perguntas ou feedback? Adoraríamos ouvir você.",
      copyright: "© {year} Convertify. Todos os direitos reservados.",
      privacy: "Privacidade",
      terms: "Termos",
    }
  },
  pages: {
    home: {
      title: "Conversão gratuita de formatos de imagem online",
      description: "Converta entre vários formatos de imagem com nossas ferramentas rápidas, gratuitas e seguras baseadas no navegador. Processe até 50 imagens de uma vez sem necessidade de upload - toda a conversão acontece diretamente no seu navegador.",
      toolsTitle: "Ferramentas gratuitas de conversão de imagens {format}",
    },
    converter: {
      titleTemplate: "Converter {source} para {target} gratuitamente online 50 imagens em lote - Convertify",
      descriptionTemplate: "Converta imagens {source} para o formato {target} online gratuitamente. Processe até 50 imagens de uma vez sem necessidade de upload - toda a conversão acontece no seu navegador para total privacidade.",
      uploadText: "Carregue suas imagens {source} e nós as converteremos para o formato {target} com a melhor qualidade e menor tamanho de arquivo. Processe até 50 arquivos de uma vez!",
    },
    about: {
      title: "Sobre nós | Convertify",
      description: "Conheça o Convertify, a ferramenta gratuita de conversão de imagens online que permite converter até 50 imagens de uma vez com total privacidade e segurança.",
    },
    contact: {
      title: "Contate-nos | Convertify",
      description: "Entre em contato com a equipe do Convertify. Agradecemos seu feedback, perguntas e sugestões sobre nossa ferramenta gratuita de conversão de imagens online.",
    },
    privacy: {
      title: "Política de privacidade | Convertify",
      description: "A Política de Privacidade do Convertify explica como lidamos com seus dados. Processamos todas as imagens localmente no seu navegador, garantindo total privacidade e segurança.",
    },
    terms: {
      title: "Termos de serviço | Convertify",
      description: "Leia os Termos de Serviço do Convertify. Ao usar nossa ferramenta gratuita de conversão de imagens online, você concorda com estes termos e condições.",
    },
    dataProtection: {
      title: "Proteção de dados | Convertify",
      description: "Saiba como o Convertify protege seus dados. Nossa ferramenta de conversão de imagens baseada no navegador processa todos os arquivos localmente, garantindo que suas imagens nunca saiam do seu dispositivo.",
    },
    notFound: {
      title: "Página não encontrada | Convertify",
      description: "A página que você está procurando não existe. Ela pode ter sido movida ou excluída.",
      goHome: "Ir para a página inicial",
    },
  },
  faq: {
    title: "Perguntas frequentes",
    questions: {
      howMany: {
        question: "Quantas imagens posso converter de uma vez?",
        answer: "O Convertify permite converter até 50 imagens simultaneamente. Basta arrastar e soltar seus arquivos ou selecioná-los do seu dispositivo, e nossa ferramenta processará todos de uma vez, economizando seu tempo e esforço."
      },
      isFree: {
        question: "O Convertify é realmente gratuito?",
        answer: "Sim, o Convertify é completamente gratuito sem taxas ocultas ou assinaturas. Não limitamos o número de conversões nem adicionamos marcas d'água às suas imagens."
      },
      privacy: {
        question: "Minhas imagens são enviadas para seus servidores?",
        answer: "Não. O Convertify processa todas as imagens diretamente no seu navegador usando tecnologias do lado do cliente. Seus arquivos nunca saem do seu dispositivo, garantindo total privacidade e segurança."
      },
      fileSize: {
        question: "Qual é o tamanho máximo de arquivo que posso converter?",
        answer: "Você pode converter imagens de até 10MB cada, com um tamanho total de lote de até 50 imagens por conversão. Para arquivos maiores, você pode precisar comprimi-los primeiro."
      },
      quality: {
        question: "Vou perder qualidade de imagem durante a conversão?",
        answer: "O Convertify se esforça para manter a mais alta qualidade possível durante a conversão. No entanto, algumas mudanças de formato inerentemente envolvem ajustes de qualidade. Por exemplo, converter de formatos sem perda (PNG) para formatos com perda (JPEG) envolverá alguma redução de qualidade. Você pode ajustar as configurações de qualidade para muitos formatos."
      },
      browsers: {
        question: "Quais navegadores são suportados?",
        answer: "O Convertify funciona em todos os navegadores modernos, incluindo Chrome, Firefox, Safari e Edge. Para a melhor experiência, recomendamos usar a versão mais recente do seu navegador preferido."
      }
    }
  }
};

// Russian translations
const ru: Translations = {
  common: {
    tools: "Инструменты",
    aboutUs: "О нас",
    contactUs: "Связаться с нами",
    home: "Главная",
    privacyPolicy: "Политика конфиденциальности",
    termsOfService: "Условия использования",
    dataProtection: "Защита данных",
    relatedConverters: "Связанные конвертеры",
    allFormats: "Все доступные форматы конвертации",
    searchFormats: "Поиск форматов...",
    noResults: "Нет форматов конвертации, соответствующих вашему запросу.",
    convert: "Конвертировать",
    to: "в",
    format: "формат",
    dragAndDrop: "Перетащите ваши изображения сюда",
    chooseFiles: "Выбрать файлы",
    uploadLimit: "или нажмите кнопку ниже, чтобы просмотреть ваши файлы (до 50 изображений за раз)",
    downloadAll: "Скачать все",
    uploadDifferent: "Загрузить другие изображения",
    converting: "Конвертация...",
    waiting: "Ожидание конвертации...",
    download: "Скачать",
    original: "Оригинал",
    converted: "Конвертировано",
    conversionStats: "Конвертировано {count} {count, plural, one {изображение} few {изображения} other {изображений}} за {time} секунд • Среднее уменьшение размера: {reduction}",
    imagesSelected: "{count} {count, plural, one {изображение выбрано} few {изображения выбрано} other {изображений выбрано}}",
    totalSize: "Общий размер: {size} КБ",
    noReduction: "без уменьшения",
    footer: {
      aboutConvertify: "О Convertify",
      popularConversions: "Популярные конвертации",
      quickLinks: "Быстрые ссылки",
      contact: "Контакт",
      contactText: "Есть вопросы или отзывы? Мы будем рады услышать вас.",
      copyright: "© {year} Convertify. Все права защищены.",
      privacy: "Конфиденциальность",
      terms: "Условия",
    }
  },
  pages: {
    home: {
      title: "Бесплатная онлайн-конвертация форматов изображений",
      description: "Конвертируйте между различными форматами изображений с помощью наших быстрых, бесплатных и безопасных инструментов на основе браузера. Обрабатывайте до 50 изображений одновременно без необходимости загрузки - вся конвертация происходит прямо в вашем браузере.",
      toolsTitle: "Бесплатные инструменты конвертации изображений {format}",
    },
    converter: {
      titleTemplate: "Конвертировать {source} в {target} бесплатно онлайн 50 изображений пакетом - Convertify",
      descriptionTemplate: "Конвертируйте изображения {source} в формат {target} онлайн бесплатно. Обрабатывайте до 50 изображений одновременно без необходимости загрузки - вся конвертация происходит в вашем браузере для полной конфиденциальности.",
      uploadText: "Загрузите ваши изображения {source}, и мы конвертируем их в формат {target} с наилучшим качеством и наименьшим размером файла. Обрабатывайте до 50 файлов одновременно!",
    },
    about: {
      title: "О нас | Convertify",
      description: "Узнайте о Convertify, бесплатном онлайн-инструменте конвертации изображений, который позволяет конвертировать до 50 изображений одновременно с полной конфиденциальностью и безопасностью.",
    },
    contact: {
      title: "Связаться с нами | Convertify",
      description: "Свяжитесь с командой Convertify. Мы приветствуем ваши отзывы, вопросы и предложения о нашем бесплатном онлайн-инструменте конвертации изображений.",
    },
    privacy: {
      title: "Политика конфиденциальности | Convertify",
      description: "Политика конфиденциальности Convertify объясняет, как мы обрабатываем ваши данные. Мы обрабатываем все изображения локально в вашем браузере, обеспечивая полную конфиденциальность и безопасность.",
    },
    terms: {
      title: "Условия использования | Convertify",
      description: "Прочитайте условия использования Convertify. Используя наш бесплатный онлайн-инструмент конвертации изображений, вы соглашаетесь с этими условиями.",
    },
    dataProtection: {
      title: "Защита данных | Convertify",
      description: "Узнайте, как Convertify защищает ваши данные. Наш инструмент конвертации изображений на основе браузера обрабатывает все файлы локально, гарантируя, что ваши изображения никогда не покидают ваше устройство.",
    },
    notFound: {
      title: "Страница не найдена | Convertify",
      description: "Страница, которую вы ищете, не существует. Возможно, она была перемещена или удалена.",
      goHome: "Перейти на главную страницу",
    },
  },
  faq: {
    title: "Часто задаваемые вопросы",
    questions: {
      howMany: {
        question: "Сколько изображений я могу конвертировать одновременно?",
        answer: "Convertify позволяет конвертировать до 50 изображений одновременно. Просто перетащите ваши файлы или выберите их с вашего устройства, и наш инструмент обработает их все сразу, экономя ваше время и усилия."
      },
      isFree: {
        question: "Convertify действительно бесплатный?",
        answer: "Да, Convertify полностью бесплатный без скрытых платежей или подписок. Мы не ограничиваем количество конвертаций и не добавляем водяные знаки на ваши изображения."
      },
      privacy: {
        question: "Загружаются ли мои изображения на ваши серверы?",
        answer: "Нет. Convertify обрабатывает все изображения непосредственно в вашем браузере, используя технологии на стороне клиента. Ваши файлы никогда не покидают ваше устройство, обеспечивая полную конфиденциальность и безопасность."
      },
      fileSize: {
        question: "Какой максимальный размер файла я могу конвертировать?",
        answer: "Вы можете конвертировать изображения размером до 10 МБ каждое, с общим размером пакета до 50 изображений за одну конвертацию. Для больших файлов вам может потребоваться сначала их сжать."
      },
      quality: {
        question: "Потеряю ли я качество изображения при конвертации?",
        answer: "Convertify стремится сохранить максимально возможное качество при конвертации. Однако некоторые изменения формата по своей природе включают корректировки качества. Например, конвертация из форматов без потерь (PNG) в форматы с потерями (JPEG) приведет к некоторому снижению качества. Вы можете настроить параметры качества для многих форматов."
      },
      browsers: {
        question: "Какие браузеры поддерживаются?",
        answer: "Convertify работает во всех современных браузерах, включая Chrome, Firefox, Safari и Edge. Для наилучшего опыта мы рекомендуем использовать последнюю версию вашего предпочитаемого браузера."
      }
    }
  }
};

// Chinese translations
const zh: Translations = {
  common: {
    tools: "工具",
    aboutUs: "关于我们",
    contactUs: "联系我们",
    home: "首页",
    privacyPolicy: "隐私政策",
    termsOfService: "服务条款",
    dataProtection: "数据保护",
    relatedConverters: "相关转换器",
    allFormats: "所有可用的转换格式",
    searchFormats: "搜索格式...",
    noResults: "没有与您的搜索匹配的转换格式。",
    convert: "转换",
    to: "为",
    format: "格式",
    dragAndDrop: "将图片拖放到这里",
    chooseFiles: "选择文件",
    uploadLimit: "或点击下面的按钮浏览文件（最多50张图片）",
    downloadAll: "全部下载",
    uploadDifferent: "上传不同的图片",
    converting: "转换中...",
    waiting: "等待转换...",
    download: "下载",
    original: "原始",
    converted: "已转换",
    conversionStats: "已转换 {count} 张图片，用时 {time} 秒 • 平均大小减少：{reduction}",
    imagesSelected: "已选择 {count} 张图片",
    totalSize: "总大小：{size} KB",
    noReduction: "无减少",
    footer: {
      aboutConvertify: "关于 Convertify",
      popularConversions: "热门转换",
      quickLinks: "快速链接",
      contact: "联系",
      contactText: "有问题或反馈？我们很乐意听取您的意见。",
      copyright: "© {year} Convertify。保留所有权利。",
      privacy: "隐私",
      terms: "条款",
    }
  },
  pages: {
    home: {
      title: "免费在线图片格式转换",
      description: "使用我们快速、免费、安全的基于浏览器的工具在各种图片格式之间转换。一次处理最多50张图片，无需上传 - 所有转换都在您的浏览器中进行。",
      toolsTitle: "免费 {format} 图片转换工具",
    },
    converter: {
      titleTemplate: "在线免费将 {source} 转换为 {target} 50张图片批量转换 - Convertify",
      descriptionTemplate: "在线免费将 {source} 图片转换为 {target} 格式。一次处理最多50张图片，无需上传 - 所有转换都在您的浏览器中进行，确保完全隐私。",
      uploadText: "上传您的 {source} 图片，我们将以最高质量和最小文件大小将其转换为 {target} 格式。一次处理最多50个文件！",
    },
    about: {
      title: "关于我们 | Convertify",
      description: "了解 Convertify，这个免费的在线图片转换工具，让您可以一次转换最多50张图片，完全保护隐私和安全。",
    },
    contact: {
      title: "联系我们 | Convertify",
      description: "联系 Convertify 团队。我们欢迎您对我们的免费在线图片转换工具提供反馈、问题和建议。",
    },
    privacy: {
      title: "隐私政策 | Convertify",
      description: "Convertify 的隐私政策解释了我们如何处理您的数据。我们在您的浏览器中本地处理所有图片，确保完全的隐私和安全。",
    },
    terms: {
      title: "服务条款 | Convertify",
      description: "阅读 Convertify 的服务条款。使用我们的免费在线图片转换工具，即表示您同意这些条款和条件。",
    },
    dataProtection: {
      title: "数据保护 | Convertify",
      description: "了解 Convertify 如何保护您的数据。我们基于浏览器的图片转换工具在本地处理所有文件，确保您的图片永远不会离开您的设备。",
    },
    notFound: {
      title: "页面未找到 | Convertify",
      description: "您要查找的页面不存在。它可能已被移动或删除。",
      goHome: "返回首页",
    },
  },
  faq: {
    title: "常见问题",
    questions: {
      howMany: {
        question: "我一次可以转换多少张图片？",
        answer: "Convertify 允许您同时转换最多50张图片。只需拖放文件或从设备中选择文件，我们的工具就会一次性处理所有文件，节省您的时间和精力。"
      },
      isFree: {
        question: "Convertify 真的是免费的吗？",
        answer: "是的，Convertify 完全免费，没有隐藏费用或订阅。我们不限制转换次数，也不会在您的图片上添加水印。"
      },
      privacy: {
        question: "我的图片会上传到您的服务器吗？",
        answer: "不会。Convertify 使用客户端技术直接在您的浏览器中处理所有图片。您的文件永远不会离开您的设备，确保完全的隐私和安全。"
      },
      fileSize: {
        question: "我可以转换的最大文件大小是多少？",
        answer: "您可以转换每个最大10MB的图片，每次转换最多50张图片。对于更大的文件，您可能需要先压缩它们。"
      },
      quality: {
        question: "转换过程中会损失图片质量吗？",
        answer: "Convertify 努力在转换过程中保持最高可能的质量。但是，某些格式更改本质上涉及质量调整。例如，从无损格式（PNG）转换为有损格式（JPEG）会导致一些质量降低。您可以为许多格式调整质量设置。"
      },
      browsers: {
        question: "支持哪些浏览器？",
        answer: "Convertify 可在所有现代浏览器上运行，包括 Chrome、Firefox、Safari 和 Edge。为获得最佳体验，我们建议使用您首选浏览器的最新版本。"
      }
    }
  }
};

// Japanese translations
const ja: Translations = {
  common: {
    tools: "ツール",
    aboutUs: "私たちについて",
    contactUs: "お問い合わせ",
    home: "ホーム",
    privacyPolicy: "プライバシーポリシー",
    termsOfService: "利用規約",
    dataProtection: "データ保護",
    relatedConverters: "関連コンバーター",
    allFormats: "利用可能なすべての変換形式",
    searchFormats: "フォーマットを検索...",
    noResults: "検索に一致する変換形式はありません。",
    convert: "変換",
    to: "に",
    format: "フォーマット",
    dragAndDrop: "ここに画像をドラッグ＆ドロップ",
    chooseFiles: "ファイルを選択",
    uploadLimit: "または下のボタンをクリックしてファイルを参照（一度に最大50枚の画像）",
    downloadAll: "すべてダウンロード",
    uploadDifferent: "別の画像をアップロード",
    converting: "変換中...",
    waiting: "変換を待機中...",
    download: "ダウンロード",
    original: "オリジナル",
    converted: "変換済み",
    conversionStats: "{count}枚の画像を{time}秒で変換 • 平均サイズ削減: {reduction}",
    imagesSelected: "{count}枚の画像が選択されました",
    totalSize: "合計サイズ: {size} KB",
    noReduction: "削減なし",
    footer: {
      aboutConvertify: "Convertifyについて",
      popularConversions: "人気の変換",
      quickLinks: "クイックリンク",
      contact: "お問い合わせ",
      contactText: "ご質問やフィードバックがありますか？ぜひお聞かせください。",
      copyright: "© {year} Convertify. All rights reserved.",
      privacy: "プライバシー",
      terms: "利用規約",
    }
  },
  pages: {
    home: {
      title: "無料オンライン画像フォーマット変換",
      description: "高速、無料、安全なブラウザベースのツールで様々な画像フォーマット間で変換できます。一度に最大50枚の画像を処理でき、アップロードは不要 - すべての変換はブラウザ内で直接行われます。",
      toolsTitle: "無料{format}画像変換ツール",
    },
    converter: {
      titleTemplate: "{source}から{target}へ無料オンライン変換 50枚の画像を一括処理 - Convertify",
      descriptionTemplate: "{source}画像を{target}形式にオンラインで無料変換。一度に最大50枚の画像を処理でき、アップロードは不要 - すべての変換はプライバシーを完全に保護するためにブラウザ内で行われます。",
      uploadText: "{source}画像をアップロードすると、最高品質と最小ファイルサイズで{target}形式に変換します。一度に最大50ファイルを処理できます！",
    },
    about: {
      title: "私たちについて | Convertify",
      description: "Convertifyについて学びましょう。完全なプライバシーとセキュリティで一度に最大50枚の画像を変換できる無料のオンライン画像変換ツールです。",
    },
    contact: {
      title: "お問い合わせ | Convertify",
      description: "Convertifyチームにお問い合わせください。無料のオンライン画像変換ツールに関するフィードバック、質問、提案をお待ちしています。",
    },
    privacy: {
      title: "プライバシーポリシー | Convertify",
      description: "Convertifyのプライバシーポリシーでは、データの取り扱い方法を説明しています。すべての画像はブラウザ内でローカルに処理され、完全なプライバシーとセキュリティを確保します。",
    },
    terms: {
      title: "利用規約 | Convertify",
      description: "Convertifyの利用規約をお読みください。無料のオンライン画像変換ツールを使用することで、これらの利用規約に同意したことになります。",
    },
    dataProtection: {
      title: "データ保護 | Convertify",
      description: "Convertifyがどのようにデータを保護しているかをご覧ください。ブラウザベースの画像変換ツールはすべてのファイルをローカルで処理し、画像がデバイスから出ることはありません。",
    },
    notFound: {
      title: "ページが見つかりません | Convertify",
      description: "お探しのページは存在しません。移動または削除された可能性があります。",
      goHome: "ホームページへ",
    },
  },
  faq: {
    title: "よくある質問",
    questions: {
      howMany: {
        question: "一度に何枚の画像を変換できますか？",
        answer: "Convertifyでは、一度に最大50枚の画像を変換できます。ファイルをドラッグ＆ドロップするか、デバイスから選択するだけで、ツールがすべてを一度に処理し、時間と労力を節約できます。"
      },
      isFree: {
        question: "Convertifyは本当に無料ですか？",
        answer: "はい、Convertifyは隠れた料金やサブスクリプションなしで完全に無料です。変換回数を制限したり、画像に透かしを追加したりすることはありません。"
      },
      privacy: {
        question: "私の画像はサーバーにアップロードされますか？",
        answer: "いいえ。Convertifyはクライアントサイドの技術を使用して、すべての画像を直接ブラウザで処理します。ファイルがデバイスから出ることはなく、完全なプライバシーとセキュリティを確保します。"
      },
      fileSize: {
        question: "変換できる最大ファイルサイズはどれくらいですか？",
        answer: "各画像最大10MBまで、1回の変換で最大50枚の画像を処理できます。より大きなファイルの場合は、最初に圧縮する必要があるかもしれません。"
      },
      quality: {
        question: "変換中に画質は失われますか？",
        answer: "Convertifyは変換中に可能な限り高い品質を維持するよう努めています。ただし、一部のフォーマット変更には本質的に品質調整が含まれます。例えば、非可逆圧縮(PNG)から可逆圧縮(JPEG)フォーマットへの変換では、多少の品質低下が発生します。多くのフォーマットで品質設定を調整できます。"
      },
      browsers: {
        question: "どのブラウザがサポートされていますか？",
        answer: "ConvertifyはChrome、Firefox、Safari、Edgeなど、すべての最新ブラウザで動作します。最良の体験を得るには、お好みのブラウザの最新バージョンを使用することをお勧めします。"
      }
    }
  }
};

// Arabic translations
const ar: Translations = {
  common: {
    tools: "أدوات",
    aboutUs: "من نحن",
    contactUs: "اتصل بنا",
    home: "الرئيسية",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    dataProtection: "حماية البيانات",
    relatedConverters: "المحولات ذات الصلة",
    allFormats: "جميع تنسيقات التحويل المتاحة",
    searchFormats: "البحث عن التنسيقات...",
    noResults: "لا توجد تنسيقات تحويل تطابق بحثك.",
    convert: "تحويل",
    to: "إلى",
    format: "تنسيق",
    dragAndDrop: "اسحب وأفلت صورك هنا",
    chooseFiles: "اختر الملفات",
    uploadLimit: "أو انقر على الزر أدناه لتصفح ملفاتك (حتى 50 صورة في المرة الواحدة)",
    downloadAll: "تنزيل الكل",
    uploadDifferent: "تحميل صور مختلفة",
    converting: "جاري التحويل...",
    waiting: "في انتظار التحويل...",
    download: "تنزيل",
    original: "الأصلي",
    converted: "المحول",
    conversionStats: "تم تحويل {count} {count, plural, zero {صورة} one {صورة} two {صورتين} few {صور} many {صورة} other {صورة}} في {time} ثوانٍ • متوسط تقليل الحجم: {reduction}",
    imagesSelected: "تم اختيار {count} {count, plural, zero {صورة} one {صورة} two {صورتين} few {صور} many {صورة} other {صورة}}",
    totalSize: "الحجم الإجمالي: {size} كيلوبايت",
    noReduction: "لا يوجد تخفيض",
    footer: {
      aboutConvertify: "عن Convertify",
      popularConversions: "التحويلات الشائعة",
      quickLinks: "روابط سريعة",
      contact: "اتصال",
      contactText: "هل لديك أسئلة أو تعليقات؟ نود أن نسمع منك.",
      copyright: "© {year} Convertify. جميع الحقوق محفوظة.",
      privacy: "الخصوصية",
      terms: "الشروط",
    }
  },
  pages: {
    home: {
      title: "تحويل تنسيقات الصور مجاناً عبر الإنترنت",
      description: "قم بالتحويل بين تنسيقات الصور المختلفة باستخدام أدواتنا السريعة والمجانية والآمنة المستندة إلى المتصفح. عالج حتى 50 صورة في المرة الواحدة دون الحاجة إلى التحميل - يتم كل التحويل مباشرة في متصفحك.",
      toolsTitle: "أدوات تحويل الصور {format} المجانية",
    },
    converter: {
      titleTemplate: "تحويل {source} إلى {target} مجاناً عبر الإنترنت 50 صورة دفعة واحدة - Convertify",
      descriptionTemplate: "قم بتحويل صور {source} إلى تنسيق {target} عبر الإنترنت مجاناً. عالج حتى 50 صورة في المرة الواحدة دون الحاجة إلى التحميل - يتم كل التحويل في متصفحك للخصوصية الكاملة.",
      uploadText: "قم بتحميل صور {source} الخاصة بك وسنقوم بتحويلها إلى تنسيق {target} بأعلى جودة وأصغر حجم للملف. عالج حتى 50 ملف في المرة الواحدة!",
    },
    about: {
      title: "من نحن | Convertify",
      description: "تعرف على Convertify، أداة تحويل الصور المجانية عبر الإنترنت التي تتيح لك تحويل حتى 50 صورة في المرة الواحدة مع خصوصية وأمان كاملين.",
    },
    contact: {
      title: "اتصل بنا | Convertify",
      description: "تواصل مع فريق Convertify. نرحب بملاحظاتك وأسئلتك واقتراحاتك حول أداة تحويل الصور المجانية عبر الإنترنت.",
    },
    privacy: {
      title: "سياسة الخصوصية | Convertify",
      description: "تشرح سياسة خصوصية Convertify كيفية تعاملنا مع بياناتك. نقوم بمعالجة جميع الصور محلياً في متصفحك، مما يضمن الخصوصية والأمان الكاملين.",
    },
    terms: {
      title: "شروط الخدمة | Convertify",
      description: "اقرأ شروط خدمة Convertify. باستخدام أداة تحويل الصور المجانية عبر الإنترنت، فإنك توافق على هذه الشروط والأحكام.",
    },
    dataProtection: {
      title: "حماية البيانات | Convertify",
      description: "تعرف على كيفية حماية Convertify لبياناتك. تقوم أداة تحويل الصور المستندة إلى المتصفح بمعالجة جميع الملفات محلياً، مما يضمن عدم مغادرة صورك لجهازك أبداً.",
    },
    notFound: {
      title: "الصفحة غير موجودة | Convertify",
      description: "الصفحة التي تبحث عنها غير موجودة. ربما تم نقلها أو حذفها.",
      goHome: "الذهاب إلى الصفحة الرئيسية",
    },
  },
  faq: {
    title: "الأسئلة الشائعة",
    questions: {
      howMany: {
        question: "كم عدد الصور التي يمكنني تحويلها في المرة الواحدة؟",
        answer: "يتيح لك Convertify تحويل ما يصل إلى 50 صورة في وقت واحد. ما عليك سوى سحب وإفلات ملفاتك أو تحديدها من جهازك، وستقوم أداتنا بمعالجتها جميعًا دفعة واحدة، مما يوفر لك الوقت والجهد."
      },
      isFree: {
        question: "هل Convertify مجاني حقًا؟",
        answer: "نعم، Convertify مجاني تمامًا بدون رسوم خفية أو اشتراكات. نحن لا نحد من عدد التحويلات ولا نضيف علامات مائية إلى صورك."
      },
      privacy: {
        question: "هل يتم تحميل صوري إلى خوادمكم؟",
        answer: "لا. يعالج Convertify جميع الصور مباشرة في متصفحك باستخدام تقنيات جانب العميل. لا تغادر ملفاتك جهازك أبدًا، مما يضمن الخصوصية والأمان الكاملين."
      },
      fileSize: {
        question: "ما هو الحد الأقصى لحجم الملف الذي يمكنني تحويله؟",
        answer: "يمكنك تحويل صور يصل حجمها إلى 10 ميجابايت لكل منها، بحجم إجمالي للدفعة يصل إلى 50 صورة لكل تحويل. بالنسبة للملفات الأكبر، قد تحتاج إلى ضغطها أولاً."
      },
      quality: {
        question: "هل سأفقد جودة الصورة أثناء التحويل؟",
        answer: "يسعى Convertify للحفاظ على أعلى جودة ممكنة أثناء التحويل. ومع ذلك، تتضمن بعض تغييرات التنسيق بطبيعتها تعديلات في الجودة. على سبيل المثال، سيؤدي التحويل من تنسيقات بدون فقدان (PNG) إلى تنسيقات مع فقدان (JPEG) إلى بعض انخفاض الجودة. يمكنك ضبط إعدادات الجودة للعديد من التنسيقات."
      },
      browsers: {
        question: "ما هي المتصفحات المدعومة؟",
        answer: "يعمل Convertify على جميع المتصفحات الحديثة بما في ذلك Chrome وFirefox وSafari وEdge. للحصول على أفضل تجربة، نوصي باستخدام أحدث إصدار من متصفحك المفضل."
      }
    }
  }
};

// Create a translations object with all languages
const translations: Record<LanguageCode, Translations> = {
  en,
  es,
  fr,
  de,
  it,
  pt,
  ru,
  zh,
  ja,
  ar
};

export default translations;