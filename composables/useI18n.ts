import { ref, computed } from 'vue'

export type Language = 'en' | 'ar' | 'fa'

// Global state to ensure single instance
const globalLanguage = ref<Language>('en')

export function useI18n() {
  const currentLanguage = globalLanguage

  const translations = {
    en: {
      title: 'Quran Radio',
      description: 'Stream beautiful Quran recitations online with Tahqiq and Tartil stations',
      footerText: 'Peace and blessings',
      streaming: 'Streaming',
      nowPlaying: 'Now Playing',
      selectStation: 'Select a station to begin',
      stations: 'Stations',
      comingSoon: 'Coming Soon',
      volume: 'Volume',
      previous: 'Previous',
      next: 'Next',
      toggleMute: 'Toggle Mute',
      sleepTimer: 'Sleep Timer',
      sleepTimerDescription: 'Audio will automatically stop after the selected time.',
      cancel: 'Cancel',
      installApp: 'Install Quran Radio',
      installAppDescription: 'Install the app for a better experience and offline access.',
      install: 'Install',
      notNow: 'Not Now',
      remaining: 'remaining',
      sleepTimerActive: 'Sleep timer active',
      minLeft: 'min left',
      timerActivated: 'minutes timer activated',
      github: 'GitHub',
      contact: 'Contact',
      listeningNow: 'listening now',
      timerDurations: {
        '15min': '15 min',
        '30min': '30 min',
        '1hour': '1 hour',
        '2hours': '2 hours'
      },
      tahqiq: {
        name: 'Tahqiq Station',
        description: 'Slow, precise recitation for deep reflection.'
      },
      tartil: {
        name: 'Tartil Station', 
        description: 'Measured, melodious recitation for steady listening.'
      }
    },
    ar: {
      title: 'إذاعة القرآن',
      description: 'استمع إلى تلاوات القرآن الجميلة عبر الإنترنت مع محطتي التحقيق والترتيل',
      footerText: 'السلام والبركات',
      streaming: 'البث المباشر',
      nowPlaying: 'يُشغل الآن',
      selectStation: 'اختر محطة للبدء',
      stations: 'المحطات',
      comingSoon: 'قريباً',
      volume: 'مستوى الصوت',
      previous: 'السابق',
      next: 'التالي',
      toggleMute: 'كتم الصوت',
      sleepTimer: 'مؤقت النوم',
      sleepTimerDescription: 'سيتوقف الصوت تلقائياً بعد الوقت المحدد.',
      cancel: 'إلغاء',
      installApp: 'تثبيت راديو القرآن',
      installAppDescription: 'ثبت التطبيق للحصول على تجربة أفضل والوصول دون اتصال.',
      install: 'تثبيت',
      notNow: 'ليس الآن',
      remaining: 'متبقي',
      sleepTimerActive: 'مؤقت النوم نشط',
      minLeft: 'دقيقة متبقية',
      timerActivated: 'دقيقة تم تفعيل المؤقت',
      github: 'جيت هاب',
      contact: 'اتصل بنا',
      listeningNow: 'يستمعون الآن',
      timerDurations: {
        '15min': '15 دقيقة',
        '30min': '30 دقيقة',
        '1hour': 'ساعة واحدة',
        '2hours': 'ساعتان'
      },
      tahqiq: {
        name: 'إذاعة التحقيق',
        description: 'تلاوة بطيئة ودقيقة للتأمل العميق.'
      },
      tartil: {
        name: 'إذاعة الترتيل',
        description: 'تلاوة منضبطة وعذبة للاستماع المستمر.'
      }
    },
    fa: {
      title: 'رادیو قرآن',
      description: 'تلاوت‌های زیبای قرآن را آنلاین با ایستگاه‌های تحقیق و ترتیل گوش دهید',
      footerText: 'صلح و برکت',
      streaming: 'پخش زنده',
      nowPlaying: 'در حال پخش',
      selectStation: 'ایستگاهی را برای شروع انتخاب کنید',
      stations: 'ایستگاه‌ها',
      comingSoon: 'به زودی',
      volume: 'صدا',
      previous: 'قبلی',
      next: 'بعدی',
      toggleMute: 'قطع صدا',
      sleepTimer: 'تایمر خواب',
      sleepTimerDescription: 'صدا بعد از زمان انتخابی به طور خودکار متوقف می‌شود.',
      cancel: 'لغو',
      installApp: 'نصب رادیو قرآن',
      installAppDescription: 'برنامه را برای تجربه بهتر و دسترسی آفلاین نصب کنید.',
      install: 'نصب',
      notNow: 'الان نه',
      remaining: 'باقی‌مانده',
      sleepTimerActive: 'تایمر خواب فعال',
      minLeft: 'دقیقه باقی‌مانده',
      timerActivated: 'دقیقه تایمر فعال شد',
      github: 'گیت‌هاب',
      contact: 'تماس',
      listeningNow: 'در حال گوش دادن',
      timerDurations: {
        '15min': '15 دقیقه',
        '30min': '30 دقیقه',
        '1hour': '1 ساعت',
        '2hours': '2 ساعت'
      },
      tahqiq: {
        name: 'ایستگاه تحقیق',
        description: 'تلاوت آرام و دقیق برای تفکر عمیق.'
      },
      tartil: {
        name: 'ایستگاه ترتیل',
        description: 'تلاوت آهنگین و منظم برای گوش دادن پیوسته.'
      }
    }
  }

  const t = computed(() => translations[currentLanguage.value])
  
  const isRTL = computed(() => ['ar', 'fa'].includes(currentLanguage.value))
  
  const setLanguage = (lang: Language) => {
    currentLanguage.value = lang
  }

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'fa', name: 'Persian', nativeName: 'فارسی' }
  ] as const

  return {
    currentLanguage,
    t,
    isRTL,
    setLanguage,
    languages
  }
}

