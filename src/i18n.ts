export type Lang = 'fr' | 'ar'

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'ع' },
]

type Badge = 'SIGNATURE' | 'POPULAIRE' | 'NOUVEAU'

export type UIStrings = {
  welcome: string
  tagline: string
  address: string
  days: string
  searchPlaceholder: string
  searchAria: string
  categoriesAria: string
  langAria: string
  themeAria: string
  all: string
  empty: string
  add: string
  unavailable: string
  addOne: string
  removeOne: string
  viewCart: string
  myCart: string
  cartEmpty: string
  closeCart: string
  total: string
  delivery: string
  deliveryAria: string
  withDelivery: string
  withoutDelivery: string
  order: string
  clearCart: string
  orderIntro: (name: string) => string
  orderModeLabel: string
  modeWith: string
  modeWithout: string
  badges: Record<Badge, string>
}

export const STRINGS: Record<Lang, UIStrings> = {
  fr: {
    welcome: 'BIENVENUE',
    tagline: 'Découvrez notre carte.',
    address: 'Atar',
    days: '7J/7',
    searchPlaceholder: 'Rechercher un plat…',
    searchAria: 'Rechercher un plat',
    categoriesAria: 'Catégories',
    langAria: 'Choisir la langue',
    themeAria: 'Couleur du thème',
    all: 'Tout',
    empty: 'Aucun plat ne correspond à ta recherche.',
    add: 'Ajouter',
    unavailable: 'Indisponible',
    addOne: 'Ajouter un',
    removeOne: 'Retirer un',
    viewCart: 'Voir le panier',
    myCart: 'Mon panier',
    cartEmpty: 'Ton panier est vide.',
    closeCart: 'Fermer le panier',
    total: 'Total',
    delivery: 'Livraison',
    deliveryAria: 'Mode de livraison',
    withDelivery: 'Avec livraison',
    withoutDelivery: 'Sans livraison',
    order: 'Commander sur WhatsApp',
    clearCart: 'Vider le panier',
    orderIntro: (name) => `Bonjour ${name}, je souhaite commander :`,
    orderModeLabel: 'Mode',
    modeWith: 'Avec livraison',
    modeWithout: 'Sans livraison (à emporter)',
    badges: { SIGNATURE: 'SIGNATURE', POPULAIRE: 'POPULAIRE', NOUVEAU: 'NOUVEAU' },
  },
  ar: {
    welcome: 'أهلاً وسهلاً',
    tagline: 'اكتشف قائمتنا.',
    address: 'أطار',
    days: '7/7',
    searchPlaceholder: 'ابحث عن طبق…',
    searchAria: 'ابحث عن طبق',
    categoriesAria: 'الفئات',
    langAria: 'اختر اللغة',
    themeAria: 'لون الواجهة',
    all: 'الكل',
    empty: 'لا يوجد طبق يطابق بحثك.',
    add: 'أضف',
    unavailable: 'غير متوفر',
    addOne: 'أضف',
    removeOne: 'أزل',
    viewCart: 'عرض السلة',
    myCart: 'سلتي',
    cartEmpty: 'سلتك فارغة.',
    closeCart: 'إغلاق السلة',
    total: 'المجموع',
    delivery: 'التوصيل',
    deliveryAria: 'طريقة التوصيل',
    withDelivery: 'مع التوصيل',
    withoutDelivery: 'بدون توصيل',
    order: 'اطلب عبر واتساب',
    clearCart: 'إفراغ السلة',
    orderIntro: (name) => `مرحباً ${name}، أرغب في الطلب:`,
    orderModeLabel: 'الطريقة',
    modeWith: 'مع التوصيل',
    modeWithout: 'بدون توصيل (الاستلام)',
    badges: { SIGNATURE: 'مميّز', POPULAIRE: 'الأكثر طلباً', NOUVEAU: 'جديد' },
  },
}
