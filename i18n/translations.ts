// Translation files for internationalization
export interface TranslationKeys {
  common: {
    convert: string;
    to: string;
    format: string;
    tools: string;
    aboutUs: string;
    contactUs: string;
    home: string;
    privacyPolicy: string;
    termsOfService: string;
    dragAndDrop: string;
    uploadLimit: string;
    chooseFiles: string;
    uploadDifferent: string;
    downloadAll: string;
    converting: string;
    conversionStats: string;
    noReduction: string;
    original: string;
    converted: string;
    download: string;
    searchFormats: string;
    noResults: string;
    allFormats: string;
    relatedConverters: string;
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
  faq: {
    title: string;
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
    notFound: {
      title: string;
      description: string;
      goHome: string;
    };
  };
}

const translations: Record<string, TranslationKeys> = {
  en: {
    common: {
      convert: 'Convert',
      to: 'to',
      format: 'format',
      tools: 'Tools',
      aboutUs: 'About Us',
      contactUs: 'Contact Us',
      home: 'Home',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      dragAndDrop: 'Drag & drop your images here',
      uploadLimit: 'Upload up to 50 images at once (10MB each)',
      chooseFiles: 'Choose Files',
      uploadDifferent: 'Upload Different Images',
      downloadAll: 'Download All',
      converting: 'Converting images...',
      conversionStats: 'Converted {count} images in {time}s. Size reduction: {reduction}',
      noReduction: 'no reduction',
      original: 'Original',
      converted: 'Converted',
      download: 'Download',
      searchFormats: 'Search formats...',
      noResults: 'No results found',
      allFormats: 'All Formats',
      relatedConverters: 'Related Converters',
      footer: {
        aboutConvertify: 'About Convertify',
        popularConversions: 'Popular Conversions',
        quickLinks: 'Quick Links',
        contact: 'Contact',
        contactText: 'Have questions or feedback?',
        copyright: '© {year} Convertify. All rights reserved.',
        privacy: 'Privacy',
        terms: 'Terms'
      }
    },
    faq: {
      title: 'Frequently Asked Questions'
    },
    pages: {
      home: {
        title: 'Free Online Image Format Conversion Tools | Bulk Convert 50 Images',
        description: 'Convert images between PNG, JPEG, WebP, AVIF, GIF, SVG and more. Process up to 50 images at once with no upload needed - all processing happens right in your browser for privacy.',
        toolsTitle: '{format} Conversion Tools'
      },
      converter: {
        titleTemplate: 'Convert {source} To {target} Free Online 50 Images Bulk In-Time - Convertify',
        descriptionTemplate: 'Convert {source} to {target} format online for free. Process up to 50 images at once with no upload required - all conversion happens in your browser for complete privacy. Fast, secure, and high quality.'
      },
      about: {
        title: 'About Us - Learn More About Convertify',
        description: 'Learn about Convertify, our mission to provide free, secure, and privacy-focused image conversion tools that work directly in your browser.'
      },
      contact: {
        title: 'Contact Us - Get in Touch with Convertify',
        description: 'Have questions about our image conversion tools? Need support? Contact the Convertify team - we\'d love to hear from you.'
      },
      privacy: {
        title: 'Privacy Policy - How Convertify Protects Your Data',
        description: 'Read our privacy policy to understand how Convertify protects your data. All image processing happens locally in your browser for complete privacy.'
      },
      terms: {
        title: 'Terms of Service - Convertify Usage Terms',
        description: 'Read our terms of service to understand the rules and guidelines for using Convertify\'s free image conversion tools.'
      },
      notFound: {
        title: 'Page Not Found',
        description: 'The page you are looking for could not be found. Return to Convertify to continue converting your images.',
        goHome: 'Go Home'
      }
    }
  },
  // Add other languages here...
  es: {
    common: {
      convert: 'Convertir',
      to: 'a',
      format: 'formato',
      tools: 'Herramientas',
      aboutUs: 'Acerca de',
      contactUs: 'Contacto',
      home: 'Inicio',
      privacyPolicy: 'Política de Privacidad',
      termsOfService: 'Términos de Servicio',
      dragAndDrop: 'Arrastra y suelta tus imágenes aquí',
      uploadLimit: 'Sube hasta 50 imágenes a la vez (10MB cada una)',
      chooseFiles: 'Elegir Archivos',
      uploadDifferent: 'Subir Imágenes Diferentes',
      downloadAll: 'Descargar Todo',
      converting: 'Convirtiendo imágenes...',
      conversionStats: 'Convertidas {count} imágenes en {time}s. Reducción de tamaño: {reduction}',
      noReduction: 'sin reducción',
      original: 'Original',
      converted: 'Convertido',
      download: 'Descargar',
      searchFormats: 'Buscar formatos...',
      noResults: 'No se encontraron resultados',
      allFormats: 'Todos los Formatos',
      relatedConverters: 'Convertidores Relacionados',
      footer: {
        aboutConvertify: 'Acerca de Convertify',
        popularConversions: 'Conversiones Populares',
        quickLinks: 'Enlaces Rápidos',
        contact: 'Contacto',
        contactText: '¿Tienes preguntas o comentarios?',
        copyright: '© {year} Convertify. Todos los derechos reservados.',
        privacy: 'Privacidad',
        terms: 'Términos'
      }
    },
    faq: {
      title: 'Preguntas Frecuentes'
    },
    pages: {
      home: {
        title: 'Herramientas Gratuitas de Conversión de Formatos de Imagen | Convierte 50 Imágenes en Lote',
        description: 'Convierte imágenes entre PNG, JPEG, WebP, AVIF, GIF, SVG y más. Procesa hasta 50 imágenes a la vez sin necesidad de subir archivos - todo el procesamiento ocurre en tu navegador para mayor privacidad.',
        toolsTitle: 'Herramientas de Conversión {format}'
      },
      converter: {
        titleTemplate: 'Convertir {source} a {target} Gratis en Línea 50 Imágenes en Lote - Convertify',
        descriptionTemplate: 'Convierte {source} a formato {target} en línea gratis. Procesa hasta 50 imágenes a la vez sin necesidad de subir archivos - toda la conversión ocurre en tu navegador para completa privacidad. Rápido, seguro y de alta calidad.'
      },
      about: {
        title: 'Acerca de Nosotros - Conoce Más Sobre Convertify',
        description: 'Conoce sobre Convertify, nuestra misión de proporcionar herramientas de conversión de imágenes gratuitas, seguras y enfocadas en la privacidad que funcionan directamente en tu navegador.'
      },
      contact: {
        title: 'Contáctanos - Ponte en Contacto con Convertify',
        description: '¿Tienes preguntas sobre nuestras herramientas de conversión de imágenes? ¿Necesitas soporte? Contacta al equipo de Convertify - nos encantaría saber de ti.'
      },
      privacy: {
        title: 'Política de Privacidad - Cómo Convertify Protege Tus Datos',
        description: 'Lee nuestra política de privacidad para entender cómo Convertify protege tus datos. Todo el procesamiento de imágenes ocurre localmente en tu navegador para completa privacidad.'
      },
      terms: {
        title: 'Términos de Servicio - Términos de Uso de Convertify',
        description: 'Lee nuestros términos de servicio para entender las reglas y pautas para usar las herramientas gratuitas de conversión de imágenes de Convertify.'
      },
      notFound: {
        title: 'Página No Encontrada',
        description: 'La página que buscas no pudo ser encontrada. Regresa a Convertify para continuar convirtiendo tus imágenes.',
        goHome: 'Ir al Inicio'
      }
    }
  }
};

export default translations;