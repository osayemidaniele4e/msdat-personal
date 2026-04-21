<template>
 <b-col class="appearance-settings">
   <h4>Appearance</h4>
   <p style="font-size: 16px;" >Customize your views, fonts, and themes to your preferred option on your dashboards.</p>

   <div class="appearance-section">
     <h5>View</h5>
     <p style="font-size: 16px;">View you dashboards in light mode, dark mode or according to your system settings.</p>
     <b-form-group class="custom-control">
       <b-form-radio-group v-model="viewMode" name="viewMode" class="light-dark">
        <div class="row radio-with-image">
         <b-form-radio value="light">
         </b-form-radio>
         <span>Light Mode</span>
         <img src="./assets/light.svg" alt="Light Mode" />
        </div>
        <div class="row radio-with-image">
         <b-form-radio value="dark" class="">
         </b-form-radio>
         <span>Dark Mode</span>
         <img src="./assets/dark.svg" alt="Dark Mode" />
        </div>
        <div class="row radio-with-image">
         <b-form-radio value="system" class="">
         </b-form-radio>
         <span>System Settings</span>
         <img src="./assets/system.svg" alt="System Settings" />
        </div>
       </b-form-radio-group>
     </b-form-group>
   </div>

   <div class="appearance-section">
     <h5>Font Size</h5>
     <p style="font-size: 16px;">Select the preferred font size to view your dashboards in.</p>
     <b-form-group>
       <b-form-radio-group v-model="fontSize" name="fontSize" class="font-sizer">
        <div class="font-box" >
         <b-form-radio value="small">Small</b-form-radio>
         <p style="font-size: 16px;" >
Dashboard
         </p>
         </div>
        <div class="font-box"  >
         <b-form-radio value="medium">Medium</b-form-radio>
         <p style="font-size:20px ;" >
Dashboard
         </p>
        </div>
        <div class="font-box">
         <b-form-radio value="large">Large</b-form-radio>
         <p style="font-size: 24px;" >
Dashboard
         </p>
        </div>
       </b-form-radio-group>
     </b-form-group>
   </div>

   <div class="appearance-section">
     <h5>Themes</h5>
     <p style="font-size: 16px;">Select the preferred colours to view your dashboards in.</p>
     <b-form-group class="theme-group">
       <b-form-radio-group v-model="theme" name="theme"  >
        <div class="row ind-theme">
         <b-form-radio value="default" class="theme-radio">
         </b-form-radio>
         <div class="span-p" >
          <span>Default</span>
          <div class="theme-colors">
            <div class="color-swatch default-1"></div>
            <div class="color-swatch default-2"></div>
            <div class="color-swatch default-3"></div>
          </div>

         </div>
        </div>
        <div class="row ind-theme">

         <b-form-radio value="calm" class="theme-radio">
         </b-form-radio>
         <div class="span-p" >
         <span>Calm</span>
         <div style="padding-left: 15px;" class="theme-colors">
           <div class="color-swatch calm-1"></div>
           <div class="color-swatch calm-2"></div>
           <div class="color-swatch calm-3"></div>
         </div>
         </div>
        </div>
        <div class="row ind-theme" >
         <b-form-radio value="neutral" class="theme-radio">
         </b-form-radio>
         <div class="span-p" >
         <span>Neutral</span>
         <div class="theme-colors">
           <div class="color-swatch neutral-1"></div>
           <div class="color-swatch neutral-2"></div>
           <div class="color-swatch neutral-3"></div>
         </div>
         </div>

        </div>
       </b-form-radio-group>
     </b-form-group>
   </div>
 </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      localViewMode: 'light',
      localFontSize: 'small',
      localTheme: 'default',
      systemPrefersDark: false,
      mediaQuery: null,
    };
  },
  computed: {
    ...mapGetters('appearance', {
      storeViewMode: 'viewMode',
      storeFontSize: 'fontSize',
      storeTheme: 'theme',
    }),
    viewMode: {
      get() {
        return this.storeViewMode || this.localViewMode;
      },
      set(value) {
        this.localViewMode = value;
        this.setViewMode(value);
        this.applyViewMode(value);
      },
    },
    fontSize: {
      get() {
        return this.storeFontSize || this.localFontSize;
      },
      set(value) {
        this.localFontSize = value;
        this.setFontSize(value);
        this.applyFontSize(value);
      },
    },
    theme: {
      get() {
        return this.storeTheme || this.localTheme;
      },
      set(value) {
        this.localTheme = value;
        this.setTheme(value);
        this.applyTheme(value);
      },
    },
  },
  methods: {
    ...mapActions('appearance', ['setViewMode', 'setFontSize', 'setTheme']),

    getSystemPreference() {
      if (window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return false;
    },

    applyViewMode(mode) {
      let effectiveMode = mode;
      if (mode === 'system') {
        effectiveMode = this.systemPrefersDark ? 'dark' : 'light';
      }

      // Remove existing mode classes and add new one
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(effectiveMode);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(effectiveMode);

      // Also set a data attribute for more styling options
      document.documentElement.setAttribute('data-view-mode', effectiveMode);
    },

    applyFontSize(size) {
      const fontSizeMap = {
        small: '14px',
        medium: '18px',
        large: '22px',
      };
      document.documentElement.style.fontSize = fontSizeMap[size] || '16px';
      document.documentElement.setAttribute('data-font-size', size);
    },

    applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
    },

    handleSystemThemeChange(e) {
      this.systemPrefersDark = e.matches;
      if (this.viewMode === 'system') {
        this.applyViewMode('system');
      }
    },

    initSystemThemeListener() {
      if (window.matchMedia) {
        this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.systemPrefersDark = this.mediaQuery.matches;

        // Use addEventListener for modern browsers
        if (this.mediaQuery.addEventListener) {
          this.mediaQuery.addEventListener('change', this.handleSystemThemeChange);
        } else if (this.mediaQuery.addListener) {
          // Fallback for older browsers
          this.mediaQuery.addListener(this.handleSystemThemeChange);
        }
      }
    },

    removeSystemThemeListener() {
      if (this.mediaQuery) {
        if (this.mediaQuery.removeEventListener) {
          this.mediaQuery.removeEventListener('change', this.handleSystemThemeChange);
        } else if (this.mediaQuery.removeListener) {
          this.mediaQuery.removeListener(this.handleSystemThemeChange);
        }
      }
    },
  },
  mounted() {
    // Initialize system theme detection
    this.initSystemThemeListener();

    // Apply current settings from store
    this.localViewMode = this.storeViewMode || 'light';
    this.localFontSize = this.storeFontSize || 'small';
    this.localTheme = this.storeTheme || 'default';

    // Apply all settings
    this.applyViewMode(this.localViewMode);
    this.applyFontSize(this.localFontSize);
    this.applyTheme(this.localTheme);
  },
  beforeDestroy() {
    this.removeSystemThemeListener();
  },
};
</script>

<style scoped>
.appearance-settings {
 width: 100%;
 margin-bottom: 100px;
}
.light-dark {
 display: flex;
 flex-direction:row;
 align-items: center;
 justify-content: space-between;
}

.appearance-section {
 margin-bottom: 40px;
 gap:24px;
}

.appearance-section h5{
 font-size:20px;
}

.radio-with-image {
 display: flex;
 width:1/3;
 flex-direction: row;
 align-items:flex-start;

 gap: 8px;
}

.radio-with-image img {
 width: 128px;
 height: 88px;
}
.font-sizer{
 display: flex;
 justify-content: space-between;
 align-items: center;
 width: 100%;
}
.font-box {
 display: flex;
 width:40%;
 flex-direction: row;
 align-items: center;
 text-align: center;
}
.font-box p{
 border: 1px solid #D4D4D4;
 border-radius: 4px;
 padding:10px 20px;
 margin-top: 10px;
}

.theme-group {
 width:60%;
 margin-right:10px;
 display:flex;
 flex-direction: row;
 justify-content: space-between;
}
.span-p{
 display:flex;
 flex-direction: row;
}

.theme-colors {
 margin-left: 20px;
 display: flex;
 gap: 5px;
}
.ind-theme {
 display: flex;
 margin-bottom: 10px;
 margin-left: 8px;
}
.color-swatch {
 width: 120px;
 height: 40px;
 border-radius: 4px;
}

.default-1 { background-color: #28a745; }
.default-2 { background-color: #20c997; }
.default-3 { background-color: #e9ecef; }
.calm-1 { background-color: #007bff; }
.calm-2 { background-color: #17a2b8; }
.calm-3 { background-color: #e3f2fd; }
.neutral-1 { background-color: #EA4700; }
.neutral-2 { background-color: #EE6C33; }
.neutral-3 { background-color: #FBDACC; }

@media (max-width: 760px) {
 .light-dark{
  display: flex;
  flex-direction: column;
 }
 .font-sizer{
  flex-direction:column;
 }
}
</style>
