import { ref, computed } from 'vue'

export type Language = 'en' | 'ar' | 'fa'

export function useI18n() {
  const currentLanguage = ref<Language>('en')

  const translations = {
    en: {
      title: 'Quran Radio',
      nowPlaying: 'Now Playing',
      selectStation: 'Select a station to begin',
      stations: 'Stations',
      comingSoon: 'Coming Soon',
      volume: 'Volume',
      previous: 'Previous',
      next: 'Next',
      toggleMute: 'Toggle Mute',
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
      nowPlaying: 'يُشغل الآن',
      selectStation: 'اختر محطة للبدء',
      stations: 'المحطات',
      comingSoon: 'قريباً',
      volume: 'مستوى الصوت',
      previous: 'السابق',
      next: 'التالي',
      toggleMute: 'كتم الصوت',
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
      nowPlaying: 'در حال پخش',
      selectStation: 'ایستگاهی را برای شروع انتخاب کنید',
      stations: 'ایستگاه‌ها',
      comingSoon: 'به زودی',
      volume: 'صدا',
      previous: 'قبلی',
      next: 'بعدی',
      toggleMute: 'قطع صدا',
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

