// Shared icon type definitions
export type IconType = 'idea' | 'vim' | 'news' | 'bio' | 'mobile' | 'stats' | 'book' | 'research' | 'info';

// Get SVG icon for OGP images (Edge runtime compatible)
// These SVGs are directly from Icons8 Flat Color Icons repository
export function getIconSVG(type?: string) {
  const iconType = (type || 'info') as IconType;

  switch (iconType) {
    case 'idea':
      // Light bulb icon from Icons8
      return (
        <svg width="80" height="80" viewBox="0 0 48 48">
          <circle fill="#FFF59D" cx="24" cy="22" r="20"/>
          <path fill="#FBC02D" d="M37,22c0-7.7-6.6-13.8-14.5-12.9c-6,0.7-10.8,5.5-11.4,11.5c-0.5,4.6,1.4,8.7,4.6,11.3 c1.4,1.2,2.3,2.9,2.3,4.8V37h12v-0.1c0-1.8,0.8-3.6,2.2-4.8C35.1,29.7,37,26.1,37,22z"/>
          <path fill="#FFF59D" d="M30.6,20.2l-3-2c-0.3-0.2-0.8-0.2-1.1,0L24,19.8l-2.4-1.6c-0.3-0.2-0.8-0.2-1.1,0l-3,2 c-0.2,0.2-0.4,0.4-0.4,0.7s0,0.6,0.2,0.8l3.8,4.7V37h2V26c0-0.2-0.1-0.4-0.2-0.6l-3.3-4.1l1.5-1l2.4,1.6c0.3,0.2,0.8,0.2,1.1,0 l2.4-1.6l1.5,1l-3.3,4.1C25.1,25.6,25,25.8,25,26v11h2V26.4l3.8-4.7c0.2-0.2,0.3-0.5,0.2-0.8S30.8,20.3,30.6,20.2z"/>
          <circle fill="#5C6BC0" cx="24" cy="44" r="3"/>
          <path fill="#9FA8DA" d="M26,45h-4c-2.2,0-4-1.8-4-4v-5h12v5C30,43.2,28.2,45,26,45z"/>
          <g fill="#5C6BC0">
            <path d="M30,41l-11.6,1.6c0.3,0.7,0.9,1.4,1.6,1.8l9.4-1.3C29.8,42.5,30,41.8,30,41z"/>
            <polygon points="18,38.7 18,40.7 30,39 30,37"/>
          </g>
        </svg>
      );
    
    case 'vim':
      // Command Line icon from Icons8
      return (
        <svg width="80" height="80" viewBox="0 0 48 48">
          <g>
            <path fill="#CFD8DC" d="M41,6H7C6.4,6,6,6.4,6,7v35h36V7C42,6.4,41.6,6,41,6z"/>
          </g>
          <rect x="8" y="13" fill="#263238" width="32" height="27"/>
          <g>
            <path fill="#76FF03" d="M22,27.6c-0.1,1.1-0.4,1.9-1,2.5c-0.6,0.6-1.4,0.9-2.5,0.9c-1.1,0-2-0.4-2.6-1.1c-0.6-0.7-0.9-1.8-0.9-3.1 v-1.6c0-1.3,0.3-2.4,0.9-3.1c0.6-0.7,1.5-1.1,2.6-1.1c1.1,0,1.9,0.3,2.5,0.9c0.6,0.6,0.9,1.4,1,2.6h-2c0-0.7-0.1-1.2-0.3-1.4 c-0.2-0.3-0.6-0.4-1.1-0.4c-0.5,0-0.9,0.2-1.2,0.6c-0.2,0.4-0.3,1-0.4,1.8v1.8c0,1,0.1,1.6,0.3,2c0.2,0.4,0.6,0.5,1.1,0.5 c0.5,0,0.9-0.1,1.1-0.4c0.2-0.3,0.3-0.7,0.3-1.4H22z"/>
            <path fill="#76FF03" d="M24,24c0-0.3,0.1-0.5,0.3-0.7c0.2-0.2,0.4-0.3,0.7-0.3c0.3,0,0.5,0.1,0.7,0.3c0.2,0.2,0.3,0.4,0.3,0.7 c0,0.3-0.1,0.5-0.3,0.7S25.3,25,25,25c-0.3,0-0.5-0.1-0.7-0.3S24,24.3,24,24z"/>
            <path fill="#76FF03" d="M24,30c0-0.3,0.1-0.5,0.3-0.7c0.2-0.2,0.4-0.3,0.7-0.3c0.3,0,0.5,0.1,0.7,0.3c0.2,0.2,0.3,0.4,0.3,0.7 c0,0.3-0.1,0.5-0.3,0.7S25.3,31,25,31c-0.3,0-0.5-0.1-0.7-0.3S24,30.3,24,30z"/>
            <path fill="#76FF03" d="M28,21h2l3,10h-2L28,21z"/>
          </g>
          <g>
            <circle fill="#90A4AE" cx="13.5" cy="9.5" r="1.5"/>
            <circle fill="#90A4AE" cx="9.5" cy="9.5" r="1.5"/>
          </g>
        </svg>
      );
    
    case 'news':
      // Megaphone/Advertising icon from Icons8
      return (
        <svg width="80" height="80" viewBox="0 0 48 48">
          <g fill="#90CAF9">
            <path d="M17.4,33H15v-4h4l0.4,1.5C19.7,31.8,18.7,33,17.4,33z"/>
            <path d="M37,36c0,0-11.8-7-18-7V15c5.8,0,18-7,18-7V36z"/>
          </g>
          <g fill="#283593">
            <circle cx="9" cy="22" r="5"/>
            <path d="M40,19h-3v6h3c1.7,0,3-1.3,3-3S41.7,19,40,19z"/>
            <path d="M18.6,41.2c-0.9,0.6-2.5,1.2-4.6,1.4c-0.6,0.1-1.2-0.3-1.4-1L8.2,27.9c0,0,8.8-6.2,8.8,1.1 c0,5.5,1.5,8.4,2.2,9.5c0.5,0.7,0.5,1.6,0,2.3C19,41,18.8,41.1,18.6,41.2z"/>
          </g>
          <path fill="#3F51B5" d="M9,29h10V15H9c-1.1,0-2,0.9-2,2v10C7,28.1,7.9,29,9,29z"/>
          <path fill="#42A5F5" d="M38,38L38,38c-1.1,0-2-0.9-2-2V8c0-1.1,0.9-2,2-2h0c1.1,0,2,0.9,2,2v28C40,37.1,39.1,38,38,38z"/>
        </svg>
      );
    
    case 'bio':
      // Plant/Biomass icon from Icons8
      return (
        <svg width="80" height="80" viewBox="0 0 48 48">
          <path fill="#9CCC65" d="M32,15V7H16v8L6.2,40c-0.6,1.5,0.5,3,2.1,3h31.5c1.6,0,2.6-1.6,2.1-3L32,15z"/>
          <path fill="#8BC34A" d="M32,9H16c-1.1,0-2-0.9-2-2v0c0-1.1,0.9-2,2-2h16c1.1,0,2,0.9,2,2v0C34,8.1,33.1,9,32,9z"/>
          <path fill="#2E7D32" d="M28,30c0,4.4-4,8-4,8s-4-3.6-4-8s4-8,4-8S28,25.6,28,30z"/>
          <path fill="#388E3C" d="M31.1,32.6c-2,4-7.1,5.4-7.1,5.4s-2-5,0-8.9s7.1-5.4,7.1-5.4S33.1,28.6,31.1,32.6z"/>
          <path fill="#43A047" d="M16.9,32.6c2,4,7.1,5.4,7.1,5.4s2-5,0-8.9s-7.1-5.4-7.1-5.4S14.9,28.6,16.9,32.6z"/>
        </svg>
      );
    
    case 'mobile':
      // Kindle/Mobile device icon from Icons8
      return (
        <svg width="80" height="80" viewBox="0 0 48 48">
          <path fill="#37474F" d="M8,41V7c0-2.2,1.8-4,4-4h24c2.2,0,4,1.8,4,4v34c0,2.2-1.8,4-4,4H12C9.8,45,8,43.2,8,41z"/>
          <path fill="#eee" d="M35,6H13c-0.6,0-1,0.4-1,1v29c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V7C36,6.4,35.6,6,35,6z"/>
          <rect x="20" y="40" fill="#546E7A" width="8" height="2"/>
          <g fill="#A1A1A1">
            <rect x="16" y="11" width="16" height="3"/>
            <rect x="16" y="18" width="16" height="2"/>
            <rect x="16" y="22" width="12" height="2"/>
            <rect x="16" y="26" width="16" height="2"/>
            <rect x="16" y="30" width="12" height="2"/>
          </g>
        </svg>
      );
    
    case 'stats':
      // Statistics/Chart icon from Icons8
      return (
        <svg width="80" height="80" viewBox="0 0 48 48">
          <g fill="#37474F">
            <rect x="23" y="5" width="2" height="36"/>
            <rect x="20.5" y="31.4" transform="matrix(.707 .707 -.707 .707 33.523 -3.921)" width="2" height="14.2"/>
            <rect x="25.5" y="31.4" transform="matrix(-.707 .707 -.707 -.707 72.487 46.995)" width="2" height="14.2"/>
          </g>
          <rect x="4" y="8" fill="#CFD8DC" width="40" height="28"/>
          <g fill="#607D8B">
            <rect x="3" y="7" width="42" height="4"/>
            <rect x="3" y="35" width="42" height="2"/>
            <circle cx="31.5" cy="43.5" r="1.5"/>
            <circle cx="16.5" cy="43.5" r="1.5"/>
          </g>
          <g fill="#C51162">
            <polygon points="31.9,18.9 26,24.9 20,18.9 11.9,26.9 14.1,29.1 20,23.1 26,29.1 34.1,21.1"/>
            <polygon points="36,24 29,17 36,17"/>
          </g>
        </svg>
      );
    
    case 'book':
      // Reading/Book icon from Icons8
      return (
        <svg width="80" height="80" viewBox="0 0 48 48">
          <path fill="#5C6BC0" d="M40,40c-6.9,0-16,4-16,4V22c0,0,9-4,18-4L40,40z"/>
          <path fill="#7986CB" d="M8,40c6.9,0,16,4,16,4V22c0,0-9-4-18-4L8,40z"/>
          <g fill="#FFB74D">
            <circle cx="24" cy="12" r="8"/>
            <path d="M41,32h1c0.6,0,1-0.4,1-1v-4c0-0.6-0.4-1-1-1h-1c-1.7,0-3,1.3-3,3v0C38,30.7,39.3,32,41,32z"/>
            <path d="M7,26H6c-0.6,0-1,0.4-1,1v4c0,0.6,0.4,1,1,1h1c1.7,0,3-1.3,3-3v0C10,27.3,8.7,26,7,26z"/>
          </g>
        </svg>
      );
    
    case 'research':
      // Graduation Cap icon from Icons8
      return (
        <svg width="80" height="80" viewBox="0 0 48 48">
          <g fill="#37474F">
            <rect x="9" y="20" width="30" height="13"/>
            <ellipse cx="24" cy="33" rx="15" ry="6"/>
          </g>
          <path fill="#78909C" d="M23.1,8.2L0.6,18.1c-0.8,0.4-0.8,1.5,0,1.9l22.5,9.9c0.6,0.2,1.2,0.2,1.8,0l22.5-9.9c0.8-0.4,0.8-1.5,0-1.9 L24.9,8.2C24.3,7.9,23.7,7.9,23.1,8.2z"/>
          <g fill="#37474F">
            <path d="M43.2,20.4l-20-3.4c-0.5-0.1-1.1,0.3-1.2,0.8c-0.1,0.5,0.3,1.1,0.8,1.2L42,22.2V37c0,0.6,0.4,1,1,1 s1-0.4,1-1V21.4C44,20.9,43.6,20.5,43.2,20.4z"/>
            <circle cx="43" cy="37" r="2"/>
            <path d="M46,40c0,1.7-3,6-3,6s-3-4.3-3-6s1.3-3,3-3S46,38.3,46,40z"/>
          </g>
        </svg>
      );
    
    case 'info':
    default:
      // Info icon from Icons8
      return (
        <svg width="80" height="80" viewBox="0 0 48 48">
          <circle fill="#2196F3" cx="24" cy="24" r="21"/>
          <rect x="22" y="22" fill="#fff" width="4" height="11"/>
          <circle fill="#fff" cx="24" cy="16.5" r="2.5"/>
        </svg>
      );
  }
}
