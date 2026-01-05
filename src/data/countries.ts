// ==========================================
// Base de données complète des pays du monde
// ==========================================

import { Country, Continent } from '../types';

export const countries: Country[] = [
    // ==========================================
    // EUROPE (44 pays)
    // ==========================================
    { id: 'FR', nameFr: 'France', nameEn: 'France', capital: 'Paris', continent: 'europe', flagEmoji: '🇫🇷', svgPath: '', difficulty: 1 },
    { id: 'DE', nameFr: 'Allemagne', nameEn: 'Germany', capital: 'Berlin', continent: 'europe', flagEmoji: '🇩🇪', svgPath: '', difficulty: 1 },
    { id: 'IT', nameFr: 'Italie', nameEn: 'Italy', capital: 'Rome', continent: 'europe', flagEmoji: '🇮🇹', svgPath: '', difficulty: 1 },
    { id: 'ES', nameFr: 'Espagne', nameEn: 'Spain', capital: 'Madrid', continent: 'europe', flagEmoji: '🇪🇸', svgPath: '', difficulty: 1 },
    { id: 'GB', nameFr: 'Royaume-Uni', nameEn: 'United Kingdom', capital: 'Londres', continent: 'europe', flagEmoji: '🇬🇧', svgPath: '', difficulty: 1 },
    { id: 'PT', nameFr: 'Portugal', nameEn: 'Portugal', capital: 'Lisbonne', continent: 'europe', flagEmoji: '🇵🇹', svgPath: '', difficulty: 2 },
    { id: 'NL', nameFr: 'Pays-Bas', nameEn: 'Netherlands', capital: 'Amsterdam', continent: 'europe', flagEmoji: '🇳🇱', svgPath: '', difficulty: 2 },
    { id: 'BE', nameFr: 'Belgique', nameEn: 'Belgium', capital: 'Bruxelles', continent: 'europe', flagEmoji: '🇧🇪', svgPath: '', difficulty: 2 },
    { id: 'CH', nameFr: 'Suisse', nameEn: 'Switzerland', capital: 'Berne', continent: 'europe', flagEmoji: '🇨🇭', svgPath: '', difficulty: 2 },
    { id: 'AT', nameFr: 'Autriche', nameEn: 'Austria', capital: 'Vienne', continent: 'europe', flagEmoji: '🇦🇹', svgPath: '', difficulty: 2 },
    { id: 'PL', nameFr: 'Pologne', nameEn: 'Poland', capital: 'Varsovie', continent: 'europe', flagEmoji: '🇵🇱', svgPath: '', difficulty: 2 },
    { id: 'SE', nameFr: 'Suède', nameEn: 'Sweden', capital: 'Stockholm', continent: 'europe', flagEmoji: '🇸🇪', svgPath: '', difficulty: 2 },
    { id: 'NO', nameFr: 'Norvège', nameEn: 'Norway', capital: 'Oslo', continent: 'europe', flagEmoji: '🇳🇴', svgPath: '', difficulty: 2 },
    { id: 'FI', nameFr: 'Finlande', nameEn: 'Finland', capital: 'Helsinki', continent: 'europe', flagEmoji: '🇫🇮', svgPath: '', difficulty: 3 },
    { id: 'DK', nameFr: 'Danemark', nameEn: 'Denmark', capital: 'Copenhague', continent: 'europe', flagEmoji: '🇩🇰', svgPath: '', difficulty: 2 },
    { id: 'IE', nameFr: 'Irlande', nameEn: 'Ireland', capital: 'Dublin', continent: 'europe', flagEmoji: '🇮🇪', svgPath: '', difficulty: 2 },
    { id: 'GR', nameFr: 'Grèce', nameEn: 'Greece', capital: 'Athènes', continent: 'europe', flagEmoji: '🇬🇷', svgPath: '', difficulty: 2 },
    { id: 'CZ', nameFr: 'Tchéquie', nameEn: 'Czechia', capital: 'Prague', continent: 'europe', flagEmoji: '🇨🇿', svgPath: '', difficulty: 3 },
    { id: 'HU', nameFr: 'Hongrie', nameEn: 'Hungary', capital: 'Budapest', continent: 'europe', flagEmoji: '🇭🇺', svgPath: '', difficulty: 3 },
    { id: 'RO', nameFr: 'Roumanie', nameEn: 'Romania', capital: 'Bucarest', continent: 'europe', flagEmoji: '🇷🇴', svgPath: '', difficulty: 3 },
    { id: 'BG', nameFr: 'Bulgarie', nameEn: 'Bulgaria', capital: 'Sofia', continent: 'europe', flagEmoji: '🇧🇬', svgPath: '', difficulty: 3 },
    { id: 'HR', nameFr: 'Croatie', nameEn: 'Croatia', capital: 'Zagreb', continent: 'europe', flagEmoji: '🇭🇷', svgPath: '', difficulty: 3 },
    { id: 'SK', nameFr: 'Slovaquie', nameEn: 'Slovakia', capital: 'Bratislava', continent: 'europe', flagEmoji: '🇸🇰', svgPath: '', difficulty: 4 },
    { id: 'SI', nameFr: 'Slovénie', nameEn: 'Slovenia', capital: 'Ljubljana', continent: 'europe', flagEmoji: '🇸🇮', svgPath: '', difficulty: 4 },
    { id: 'RS', nameFr: 'Serbie', nameEn: 'Serbia', capital: 'Belgrade', continent: 'europe', flagEmoji: '🇷🇸', svgPath: '', difficulty: 3 },
    { id: 'BA', nameFr: 'Bosnie-Herzégovine', nameEn: 'Bosnia', capital: 'Sarajevo', continent: 'europe', flagEmoji: '🇧🇦', svgPath: '', difficulty: 4 },
    { id: 'AL', nameFr: 'Albanie', nameEn: 'Albania', capital: 'Tirana', continent: 'europe', flagEmoji: '🇦🇱', svgPath: '', difficulty: 4 },
    { id: 'MK', nameFr: 'Macédoine du Nord', nameEn: 'North Macedonia', capital: 'Skopje', continent: 'europe', flagEmoji: '🇲🇰', svgPath: '', difficulty: 4 },
    { id: 'ME', nameFr: 'Monténégro', nameEn: 'Montenegro', capital: 'Podgorica', continent: 'europe', flagEmoji: '🇲🇪', svgPath: '', difficulty: 5 },
    { id: 'XK', nameFr: 'Kosovo', nameEn: 'Kosovo', capital: 'Pristina', continent: 'europe', flagEmoji: '🇽🇰', svgPath: '', difficulty: 5 },
    { id: 'LT', nameFr: 'Lituanie', nameEn: 'Lithuania', capital: 'Vilnius', continent: 'europe', flagEmoji: '🇱🇹', svgPath: '', difficulty: 4 },
    { id: 'LV', nameFr: 'Lettonie', nameEn: 'Latvia', capital: 'Riga', continent: 'europe', flagEmoji: '🇱🇻', svgPath: '', difficulty: 4 },
    { id: 'EE', nameFr: 'Estonie', nameEn: 'Estonia', capital: 'Tallinn', continent: 'europe', flagEmoji: '🇪🇪', svgPath: '', difficulty: 4 },
    { id: 'UA', nameFr: 'Ukraine', nameEn: 'Ukraine', capital: 'Kiev', continent: 'europe', flagEmoji: '🇺🇦', svgPath: '', difficulty: 2 },
    { id: 'BY', nameFr: 'Biélorussie', nameEn: 'Belarus', capital: 'Minsk', continent: 'europe', flagEmoji: '🇧🇾', svgPath: '', difficulty: 3 },
    { id: 'MD', nameFr: 'Moldavie', nameEn: 'Moldova', capital: 'Chișinău', continent: 'europe', flagEmoji: '🇲🇩', svgPath: '', difficulty: 4 },
    { id: 'IS', nameFr: 'Islande', nameEn: 'Iceland', capital: 'Reykjavik', continent: 'europe', flagEmoji: '🇮🇸', svgPath: '', difficulty: 2 },
    { id: 'LU', nameFr: 'Luxembourg', nameEn: 'Luxembourg', capital: 'Luxembourg', continent: 'europe', flagEmoji: '🇱🇺', svgPath: '', difficulty: 4 },
    { id: 'CY', nameFr: 'Chypre', nameEn: 'Cyprus', capital: 'Nicosie', continent: 'europe', flagEmoji: '🇨🇾', svgPath: '', difficulty: 4 },
    { id: 'TR', nameFr: 'Turquie', nameEn: 'Turkey', capital: 'Ankara', continent: 'europe', flagEmoji: '🇹🇷', svgPath: '', difficulty: 2 },
    { id: 'MT', nameFr: 'Malte', nameEn: 'Malta', capital: 'La Valette', continent: 'europe', flagEmoji: '🇲🇹', svgPath: '', difficulty: 5 },
    { id: 'MC', nameFr: 'Monaco', nameEn: 'Monaco', capital: 'Monaco', continent: 'europe', flagEmoji: '🇲🇨', svgPath: '', difficulty: 5 },
    { id: 'AD', nameFr: 'Andorre', nameEn: 'Andorra', capital: 'Andorre-la-Vieille', continent: 'europe', flagEmoji: '🇦🇩', svgPath: '', difficulty: 5 },
    { id: 'LI', nameFr: 'Liechtenstein', nameEn: 'Liechtenstein', capital: 'Vaduz', continent: 'europe', flagEmoji: '🇱🇮', svgPath: '', difficulty: 6 },
    { id: 'SM', nameFr: 'Saint-Marin', nameEn: 'San Marino', capital: 'Saint-Marin', continent: 'europe', flagEmoji: '🇸🇲', svgPath: '', difficulty: 6 },

    // ==========================================
    // ASIA (48 pays)
    // ==========================================
    { id: 'CN', nameFr: 'Chine', nameEn: 'China', capital: 'Pékin', continent: 'asia', flagEmoji: '🇨🇳', svgPath: '', difficulty: 1 },
    { id: 'JP', nameFr: 'Japon', nameEn: 'Japan', capital: 'Tokyo', continent: 'asia', flagEmoji: '🇯🇵', svgPath: '', difficulty: 1 },
    { id: 'IN', nameFr: 'Inde', nameEn: 'India', capital: 'New Delhi', continent: 'asia', flagEmoji: '🇮🇳', svgPath: '', difficulty: 1 },
    { id: 'RU', nameFr: 'Russie', nameEn: 'Russia', capital: 'Moscou', continent: 'asia', flagEmoji: '🇷🇺', svgPath: '', difficulty: 1 },
    { id: 'KR', nameFr: 'Corée du Sud', nameEn: 'South Korea', capital: 'Séoul', continent: 'asia', flagEmoji: '🇰🇷', svgPath: '', difficulty: 2 },
    { id: 'KP', nameFr: 'Corée du Nord', nameEn: 'North Korea', capital: 'Pyongyang', continent: 'asia', flagEmoji: '🇰🇵', svgPath: '', difficulty: 3 },
    { id: 'TH', nameFr: 'Thaïlande', nameEn: 'Thailand', capital: 'Bangkok', continent: 'asia', flagEmoji: '🇹🇭', svgPath: '', difficulty: 2 },
    { id: 'VN', nameFr: 'Vietnam', nameEn: 'Vietnam', capital: 'Hanoï', continent: 'asia', flagEmoji: '🇻🇳', svgPath: '', difficulty: 2 },
    { id: 'ID', nameFr: 'Indonésie', nameEn: 'Indonesia', capital: 'Jakarta', continent: 'asia', flagEmoji: '🇮🇩', svgPath: '', difficulty: 2 },
    { id: 'MY', nameFr: 'Malaisie', nameEn: 'Malaysia', capital: 'Kuala Lumpur', continent: 'asia', flagEmoji: '🇲🇾', svgPath: '', difficulty: 3 },
    { id: 'PH', nameFr: 'Philippines', nameEn: 'Philippines', capital: 'Manille', continent: 'asia', flagEmoji: '🇵🇭', svgPath: '', difficulty: 2 },
    { id: 'MM', nameFr: 'Myanmar', nameEn: 'Myanmar', capital: 'Naypyidaw', continent: 'asia', flagEmoji: '🇲🇲', svgPath: '', difficulty: 4 },
    { id: 'KH', nameFr: 'Cambodge', nameEn: 'Cambodia', capital: 'Phnom Penh', continent: 'asia', flagEmoji: '🇰🇭', svgPath: '', difficulty: 3 },
    { id: 'LA', nameFr: 'Laos', nameEn: 'Laos', capital: 'Vientiane', continent: 'asia', flagEmoji: '🇱🇦', svgPath: '', difficulty: 4 },
    { id: 'TL', nameFr: 'Timor oriental', nameEn: 'Timor-Leste', capital: 'Dili', continent: 'asia', flagEmoji: '🇹🇱', svgPath: '', difficulty: 5 },
    { id: 'SA', nameFr: 'Arabie Saoudite', nameEn: 'Saudi Arabia', capital: 'Riyad', continent: 'asia', flagEmoji: '🇸🇦', svgPath: '', difficulty: 2 },
    { id: 'AE', nameFr: 'Émirats Arabes Unis', nameEn: 'UAE', capital: 'Abu Dhabi', continent: 'asia', flagEmoji: '🇦🇪', svgPath: '', difficulty: 2 },
    { id: 'QA', nameFr: 'Qatar', nameEn: 'Qatar', capital: 'Doha', continent: 'asia', flagEmoji: '🇶🇦', svgPath: '', difficulty: 3 },
    { id: 'KW', nameFr: 'Koweït', nameEn: 'Kuwait', capital: 'Koweït', continent: 'asia', flagEmoji: '🇰🇼', svgPath: '', difficulty: 4 },
    { id: 'OM', nameFr: 'Oman', nameEn: 'Oman', capital: 'Mascate', continent: 'asia', flagEmoji: '🇴🇲', svgPath: '', difficulty: 4 },
    { id: 'YE', nameFr: 'Yémen', nameEn: 'Yemen', capital: 'Sanaa', continent: 'asia', flagEmoji: '🇾🇪', svgPath: '', difficulty: 3 },
    { id: 'IR', nameFr: 'Iran', nameEn: 'Iran', capital: 'Téhéran', continent: 'asia', flagEmoji: '🇮🇷', svgPath: '', difficulty: 2 },
    { id: 'IQ', nameFr: 'Irak', nameEn: 'Iraq', capital: 'Bagdad', continent: 'asia', flagEmoji: '🇮🇶', svgPath: '', difficulty: 2 },
    { id: 'SY', nameFr: 'Syrie', nameEn: 'Syria', capital: 'Damas', continent: 'asia', flagEmoji: '🇸🇾', svgPath: '', difficulty: 3 },
    { id: 'JO', nameFr: 'Jordanie', nameEn: 'Jordan', capital: 'Amman', continent: 'asia', flagEmoji: '🇯🇴', svgPath: '', difficulty: 3 },
    { id: 'LB', nameFr: 'Liban', nameEn: 'Lebanon', capital: 'Beyrouth', continent: 'asia', flagEmoji: '🇱🇧', svgPath: '', difficulty: 3 },
    { id: 'IL', nameFr: 'Israël', nameEn: 'Israel', capital: 'Jérusalem', continent: 'asia', flagEmoji: '🇮🇱', svgPath: '', difficulty: 2 },
    { id: 'PK', nameFr: 'Pakistan', nameEn: 'Pakistan', capital: 'Islamabad', continent: 'asia', flagEmoji: '🇵🇰', svgPath: '', difficulty: 2 },
    { id: 'AF', nameFr: 'Afghanistan', nameEn: 'Afghanistan', capital: 'Kaboul', continent: 'asia', flagEmoji: '🇦🇫', svgPath: '', difficulty: 2 },
    { id: 'BD', nameFr: 'Bangladesh', nameEn: 'Bangladesh', capital: 'Dacca', continent: 'asia', flagEmoji: '🇧🇩', svgPath: '', difficulty: 3 },
    { id: 'NP', nameFr: 'Népal', nameEn: 'Nepal', capital: 'Katmandou', continent: 'asia', flagEmoji: '🇳🇵', svgPath: '', difficulty: 3 },
    { id: 'BT', nameFr: 'Bhoutan', nameEn: 'Bhutan', capital: 'Thimphou', continent: 'asia', flagEmoji: '🇧🇹', svgPath: '', difficulty: 5 },
    { id: 'LK', nameFr: 'Sri Lanka', nameEn: 'Sri Lanka', capital: 'Colombo', continent: 'asia', flagEmoji: '🇱🇰', svgPath: '', difficulty: 3 },
    { id: 'SG', nameFr: 'Singapour', nameEn: 'Singapore', capital: 'Singapour', continent: 'asia', flagEmoji: '🇸🇬', svgPath: '', difficulty: 3 },
    { id: 'BN', nameFr: 'Brunei', nameEn: 'Brunei', capital: 'Bandar Seri Begawan', continent: 'asia', flagEmoji: '🇧🇳', svgPath: '', difficulty: 5 },
    { id: 'BH', nameFr: 'Bahreïn', nameEn: 'Bahrain', capital: 'Manama', continent: 'asia', flagEmoji: '🇧🇭', svgPath: '', difficulty: 5 },
    { id: 'MV', nameFr: 'Maldives', nameEn: 'Maldives', capital: 'Malé', continent: 'asia', flagEmoji: '🇲🇻', svgPath: '', difficulty: 5 },
    { id: 'KZ', nameFr: 'Kazakhstan', nameEn: 'Kazakhstan', capital: 'Astana', continent: 'asia', flagEmoji: '🇰🇿', svgPath: '', difficulty: 3 },
    { id: 'UZ', nameFr: 'Ouzbékistan', nameEn: 'Uzbekistan', capital: 'Tachkent', continent: 'asia', flagEmoji: '🇺🇿', svgPath: '', difficulty: 4 },
    { id: 'TM', nameFr: 'Turkménistan', nameEn: 'Turkmenistan', capital: 'Achgabat', continent: 'asia', flagEmoji: '🇹🇲', svgPath: '', difficulty: 5 },
    { id: 'TJ', nameFr: 'Tadjikistan', nameEn: 'Tajikistan', capital: 'Douchanbé', continent: 'asia', flagEmoji: '🇹🇯', svgPath: '', difficulty: 5 },
    { id: 'KG', nameFr: 'Kirghizistan', nameEn: 'Kyrgyzstan', capital: 'Bichkek', continent: 'asia', flagEmoji: '🇰🇬', svgPath: '', difficulty: 5 },
    { id: 'MN', nameFr: 'Mongolie', nameEn: 'Mongolia', capital: 'Oulan-Bator', continent: 'asia', flagEmoji: '🇲🇳', svgPath: '', difficulty: 3 },
    { id: 'GE', nameFr: 'Géorgie', nameEn: 'Georgia', capital: 'Tbilissi', continent: 'asia', flagEmoji: '🇬🇪', svgPath: '', difficulty: 4 },
    { id: 'AM', nameFr: 'Arménie', nameEn: 'Armenia', capital: 'Erevan', continent: 'asia', flagEmoji: '🇦🇲', svgPath: '', difficulty: 4 },
    { id: 'AZ', nameFr: 'Azerbaïdjan', nameEn: 'Azerbaijan', capital: 'Bakou', continent: 'asia', flagEmoji: '🇦🇿', svgPath: '', difficulty: 4 },
    { id: 'TW', nameFr: 'Taïwan', nameEn: 'Taiwan', capital: 'Taipei', continent: 'asia', flagEmoji: '🇹🇼', svgPath: '', difficulty: 3 },

    // ==========================================
    // AFRICA (54 pays)
    // ==========================================
    { id: 'EG', nameFr: 'Égypte', nameEn: 'Egypt', capital: 'Le Caire', continent: 'africa', flagEmoji: '🇪🇬', svgPath: '', difficulty: 1 },
    { id: 'ZA', nameFr: 'Afrique du Sud', nameEn: 'South Africa', capital: 'Pretoria', continent: 'africa', flagEmoji: '🇿🇦', svgPath: '', difficulty: 1 },
    { id: 'MA', nameFr: 'Maroc', nameEn: 'Morocco', capital: 'Rabat', continent: 'africa', flagEmoji: '🇲🇦', svgPath: '', difficulty: 1 },
    { id: 'DZ', nameFr: 'Algérie', nameEn: 'Algeria', capital: 'Alger', continent: 'africa', flagEmoji: '🇩🇿', svgPath: '', difficulty: 2 },
    { id: 'TN', nameFr: 'Tunisie', nameEn: 'Tunisia', capital: 'Tunis', continent: 'africa', flagEmoji: '🇹🇳', svgPath: '', difficulty: 2 },
    { id: 'LY', nameFr: 'Libye', nameEn: 'Libya', capital: 'Tripoli', continent: 'africa', flagEmoji: '🇱🇾', svgPath: '', difficulty: 3 },
    { id: 'NG', nameFr: 'Nigeria', nameEn: 'Nigeria', capital: 'Abuja', continent: 'africa', flagEmoji: '🇳🇬', svgPath: '', difficulty: 2 },
    { id: 'KE', nameFr: 'Kenya', nameEn: 'Kenya', capital: 'Nairobi', continent: 'africa', flagEmoji: '🇰🇪', svgPath: '', difficulty: 2 },
    { id: 'ET', nameFr: 'Éthiopie', nameEn: 'Ethiopia', capital: 'Addis-Abeba', continent: 'africa', flagEmoji: '🇪🇹', svgPath: '', difficulty: 2 },
    { id: 'GH', nameFr: 'Ghana', nameEn: 'Ghana', capital: 'Accra', continent: 'africa', flagEmoji: '🇬🇭', svgPath: '', difficulty: 3 },
    { id: 'CI', nameFr: "Côte d'Ivoire", nameEn: 'Ivory Coast', capital: 'Yamoussoukro', continent: 'africa', flagEmoji: '🇨🇮', svgPath: '', difficulty: 3 },
    { id: 'SN', nameFr: 'Sénégal', nameEn: 'Senegal', capital: 'Dakar', continent: 'africa', flagEmoji: '🇸🇳', svgPath: '', difficulty: 3 },
    { id: 'CM', nameFr: 'Cameroun', nameEn: 'Cameroon', capital: 'Yaoundé', continent: 'africa', flagEmoji: '🇨🇲', svgPath: '', difficulty: 3 },
    { id: 'TZ', nameFr: 'Tanzanie', nameEn: 'Tanzania', capital: 'Dodoma', continent: 'africa', flagEmoji: '🇹🇿', svgPath: '', difficulty: 3 },
    { id: 'UG', nameFr: 'Ouganda', nameEn: 'Uganda', capital: 'Kampala', continent: 'africa', flagEmoji: '🇺🇬', svgPath: '', difficulty: 3 },
    { id: 'SD', nameFr: 'Soudan', nameEn: 'Sudan', capital: 'Khartoum', continent: 'africa', flagEmoji: '🇸🇩', svgPath: '', difficulty: 3 },
    { id: 'SS', nameFr: 'Soudan du Sud', nameEn: 'South Sudan', capital: 'Djouba', continent: 'africa', flagEmoji: '🇸🇸', svgPath: '', difficulty: 4 },
    { id: 'AO', nameFr: 'Angola', nameEn: 'Angola', capital: 'Luanda', continent: 'africa', flagEmoji: '🇦🇴', svgPath: '', difficulty: 3 },
    { id: 'MZ', nameFr: 'Mozambique', nameEn: 'Mozambique', capital: 'Maputo', continent: 'africa', flagEmoji: '🇲🇿', svgPath: '', difficulty: 4 },
    { id: 'MG', nameFr: 'Madagascar', nameEn: 'Madagascar', capital: 'Antananarivo', continent: 'africa', flagEmoji: '🇲🇬', svgPath: '', difficulty: 2 },
    { id: 'ZM', nameFr: 'Zambie', nameEn: 'Zambia', capital: 'Lusaka', continent: 'africa', flagEmoji: '🇿🇲', svgPath: '', difficulty: 4 },
    { id: 'ZW', nameFr: 'Zimbabwe', nameEn: 'Zimbabwe', capital: 'Harare', continent: 'africa', flagEmoji: '🇿🇼', svgPath: '', difficulty: 3 },
    { id: 'BW', nameFr: 'Botswana', nameEn: 'Botswana', capital: 'Gaborone', continent: 'africa', flagEmoji: '🇧🇼', svgPath: '', difficulty: 4 },
    { id: 'NA', nameFr: 'Namibie', nameEn: 'Namibia', capital: 'Windhoek', continent: 'africa', flagEmoji: '🇳🇦', svgPath: '', difficulty: 3 },
    { id: 'CD', nameFr: 'RD Congo', nameEn: 'DR Congo', capital: 'Kinshasa', continent: 'africa', flagEmoji: '🇨🇩', svgPath: '', difficulty: 2 },
    { id: 'CG', nameFr: 'Congo', nameEn: 'Congo', capital: 'Brazzaville', continent: 'africa', flagEmoji: '🇨🇬', svgPath: '', difficulty: 4 },
    { id: 'GA', nameFr: 'Gabon', nameEn: 'Gabon', capital: 'Libreville', continent: 'africa', flagEmoji: '🇬🇦', svgPath: '', difficulty: 4 },
    { id: 'GQ', nameFr: 'Guinée équatoriale', nameEn: 'Equatorial Guinea', capital: 'Malabo', continent: 'africa', flagEmoji: '🇬🇶', svgPath: '', difficulty: 5 },
    { id: 'CF', nameFr: 'Centrafrique', nameEn: 'Central African Rep.', capital: 'Bangui', continent: 'africa', flagEmoji: '🇨🇫', svgPath: '', difficulty: 4 },
    { id: 'ML', nameFr: 'Mali', nameEn: 'Mali', capital: 'Bamako', continent: 'africa', flagEmoji: '🇲🇱', svgPath: '', difficulty: 3 },
    { id: 'NE', nameFr: 'Niger', nameEn: 'Niger', capital: 'Niamey', continent: 'africa', flagEmoji: '🇳🇪', svgPath: '', difficulty: 4 },
    { id: 'TD', nameFr: 'Tchad', nameEn: 'Chad', capital: "N'Djamena", continent: 'africa', flagEmoji: '🇹🇩', svgPath: '', difficulty: 4 },
    { id: 'BF', nameFr: 'Burkina Faso', nameEn: 'Burkina Faso', capital: 'Ouagadougou', continent: 'africa', flagEmoji: '🇧🇫', svgPath: '', difficulty: 4 },
    { id: 'MR', nameFr: 'Mauritanie', nameEn: 'Mauritania', capital: 'Nouakchott', continent: 'africa', flagEmoji: '🇲🇷', svgPath: '', difficulty: 4 },
    { id: 'SO', nameFr: 'Somalie', nameEn: 'Somalia', capital: 'Mogadiscio', continent: 'africa', flagEmoji: '🇸🇴', svgPath: '', difficulty: 3 },
    { id: 'ER', nameFr: 'Érythrée', nameEn: 'Eritrea', capital: 'Asmara', continent: 'africa', flagEmoji: '🇪🇷', svgPath: '', difficulty: 4 },
    { id: 'DJ', nameFr: 'Djibouti', nameEn: 'Djibouti', capital: 'Djibouti', continent: 'africa', flagEmoji: '🇩🇯', svgPath: '', difficulty: 5 },
    { id: 'RW', nameFr: 'Rwanda', nameEn: 'Rwanda', capital: 'Kigali', continent: 'africa', flagEmoji: '🇷🇼', svgPath: '', difficulty: 4 },
    { id: 'BI', nameFr: 'Burundi', nameEn: 'Burundi', capital: 'Gitega', continent: 'africa', flagEmoji: '🇧🇮', svgPath: '', difficulty: 5 },
    { id: 'MW', nameFr: 'Malawi', nameEn: 'Malawi', capital: 'Lilongwe', continent: 'africa', flagEmoji: '🇲🇼', svgPath: '', difficulty: 4 },
    { id: 'LS', nameFr: 'Lesotho', nameEn: 'Lesotho', capital: 'Maseru', continent: 'africa', flagEmoji: '🇱🇸', svgPath: '', difficulty: 5 },
    { id: 'SZ', nameFr: 'Eswatini', nameEn: 'Eswatini', capital: 'Mbabane', continent: 'africa', flagEmoji: '🇸🇿', svgPath: '', difficulty: 5 },
    { id: 'GM', nameFr: 'Gambie', nameEn: 'Gambia', capital: 'Banjul', continent: 'africa', flagEmoji: '🇬🇲', svgPath: '', difficulty: 5 },
    { id: 'GN', nameFr: 'Guinée', nameEn: 'Guinea', capital: 'Conakry', continent: 'africa', flagEmoji: '🇬🇳', svgPath: '', difficulty: 4 },
    { id: 'GW', nameFr: 'Guinée-Bissau', nameEn: 'Guinea-Bissau', capital: 'Bissau', continent: 'africa', flagEmoji: '🇬🇼', svgPath: '', difficulty: 5 },
    { id: 'LR', nameFr: 'Liberia', nameEn: 'Liberia', capital: 'Monrovia', continent: 'africa', flagEmoji: '🇱🇷', svgPath: '', difficulty: 4 },
    { id: 'SL', nameFr: 'Sierra Leone', nameEn: 'Sierra Leone', capital: 'Freetown', continent: 'africa', flagEmoji: '🇸🇱', svgPath: '', difficulty: 4 },
    { id: 'TG', nameFr: 'Togo', nameEn: 'Togo', capital: 'Lomé', continent: 'africa', flagEmoji: '🇹🇬', svgPath: '', difficulty: 4 },
    { id: 'BJ', nameFr: 'Bénin', nameEn: 'Benin', capital: 'Porto-Novo', continent: 'africa', flagEmoji: '🇧🇯', svgPath: '', difficulty: 4 },
    { id: 'MU', nameFr: 'Maurice', nameEn: 'Mauritius', capital: 'Port-Louis', continent: 'africa', flagEmoji: '🇲🇺', svgPath: '', difficulty: 5 },
    { id: 'SC', nameFr: 'Seychelles', nameEn: 'Seychelles', capital: 'Victoria', continent: 'africa', flagEmoji: '🇸🇨', svgPath: '', difficulty: 6 },
    { id: 'KM', nameFr: 'Comores', nameEn: 'Comoros', capital: 'Moroni', continent: 'africa', flagEmoji: '🇰🇲', svgPath: '', difficulty: 6 },
    { id: 'CV', nameFr: 'Cap-Vert', nameEn: 'Cape Verde', capital: 'Praia', continent: 'africa', flagEmoji: '🇨🇻', svgPath: '', difficulty: 5 },
    { id: 'ST', nameFr: 'Sao Tomé-et-Príncipe', nameEn: 'Sao Tome', capital: 'São Tomé', continent: 'africa', flagEmoji: '🇸🇹', svgPath: '', difficulty: 6 },

    // ==========================================
    // NORTH AMERICA (23 pays)
    // ==========================================
    { id: 'US', nameFr: 'États-Unis', nameEn: 'United States', capital: 'Washington', continent: 'north_america', flagEmoji: '🇺🇸', svgPath: '', difficulty: 1 },
    { id: 'CA', nameFr: 'Canada', nameEn: 'Canada', capital: 'Ottawa', continent: 'north_america', flagEmoji: '🇨🇦', svgPath: '', difficulty: 1 },
    { id: 'MX', nameFr: 'Mexique', nameEn: 'Mexico', capital: 'Mexico', continent: 'north_america', flagEmoji: '🇲🇽', svgPath: '', difficulty: 1 },
    { id: 'GT', nameFr: 'Guatemala', nameEn: 'Guatemala', capital: 'Guatemala', continent: 'north_america', flagEmoji: '🇬🇹', svgPath: '', difficulty: 3 },
    { id: 'BZ', nameFr: 'Belize', nameEn: 'Belize', capital: 'Belmopan', continent: 'north_america', flagEmoji: '🇧🇿', svgPath: '', difficulty: 4 },
    { id: 'HN', nameFr: 'Honduras', nameEn: 'Honduras', capital: 'Tegucigalpa', continent: 'north_america', flagEmoji: '🇭🇳', svgPath: '', difficulty: 4 },
    { id: 'SV', nameFr: 'Salvador', nameEn: 'El Salvador', capital: 'San Salvador', continent: 'north_america', flagEmoji: '🇸🇻', svgPath: '', difficulty: 4 },
    { id: 'NI', nameFr: 'Nicaragua', nameEn: 'Nicaragua', capital: 'Managua', continent: 'north_america', flagEmoji: '🇳🇮', svgPath: '', difficulty: 4 },
    { id: 'CR', nameFr: 'Costa Rica', nameEn: 'Costa Rica', capital: 'San José', continent: 'north_america', flagEmoji: '🇨🇷', svgPath: '', difficulty: 3 },
    { id: 'PA', nameFr: 'Panama', nameEn: 'Panama', capital: 'Panama', continent: 'north_america', flagEmoji: '🇵🇦', svgPath: '', difficulty: 3 },
    { id: 'CU', nameFr: 'Cuba', nameEn: 'Cuba', capital: 'La Havane', continent: 'north_america', flagEmoji: '🇨🇺', svgPath: '', difficulty: 2 },
    { id: 'HT', nameFr: 'Haïti', nameEn: 'Haiti', capital: 'Port-au-Prince', continent: 'north_america', flagEmoji: '🇭🇹', svgPath: '', difficulty: 3 },
    { id: 'DO', nameFr: 'Rép. Dominicaine', nameEn: 'Dominican Rep.', capital: 'Saint-Domingue', continent: 'north_america', flagEmoji: '🇩🇴', svgPath: '', difficulty: 3 },
    { id: 'JM', nameFr: 'Jamaïque', nameEn: 'Jamaica', capital: 'Kingston', continent: 'north_america', flagEmoji: '🇯🇲', svgPath: '', difficulty: 3 },
    { id: 'TT', nameFr: 'Trinité-et-Tobago', nameEn: 'Trinidad and Tobago', capital: 'Port-d\'Espagne', continent: 'north_america', flagEmoji: '🇹🇹', svgPath: '', difficulty: 4 },
    { id: 'BS', nameFr: 'Bahamas', nameEn: 'Bahamas', capital: 'Nassau', continent: 'north_america', flagEmoji: '🇧🇸', svgPath: '', difficulty: 4 },
    { id: 'BB', nameFr: 'Barbade', nameEn: 'Barbados', capital: 'Bridgetown', continent: 'north_america', flagEmoji: '🇧🇧', svgPath: '', difficulty: 5 },
    { id: 'LC', nameFr: 'Sainte-Lucie', nameEn: 'Saint Lucia', capital: 'Castries', continent: 'north_america', flagEmoji: '🇱🇨', svgPath: '', difficulty: 6 },
    { id: 'GD', nameFr: 'Grenade', nameEn: 'Grenada', capital: 'Saint-Georges', continent: 'north_america', flagEmoji: '🇬🇩', svgPath: '', difficulty: 6 },
    { id: 'VC', nameFr: 'Saint-Vincent', nameEn: 'St. Vincent', capital: 'Kingstown', continent: 'north_america', flagEmoji: '🇻🇨', svgPath: '', difficulty: 6 },
    { id: 'AG', nameFr: 'Antigua-et-Barbuda', nameEn: 'Antigua and Barbuda', capital: 'Saint John\'s', continent: 'north_america', flagEmoji: '🇦🇬', svgPath: '', difficulty: 6 },
    { id: 'DM', nameFr: 'Dominique', nameEn: 'Dominica', capital: 'Roseau', continent: 'north_america', flagEmoji: '🇩🇲', svgPath: '', difficulty: 6 },
    { id: 'KN', nameFr: 'Saint-Kitts-et-Nevis', nameEn: 'Saint Kitts and Nevis', capital: 'Basseterre', continent: 'north_america', flagEmoji: '🇰🇳', svgPath: '', difficulty: 6 },

    // ==========================================
    // SOUTH AMERICA (13 pays)
    // ==========================================
    { id: 'BR', nameFr: 'Brésil', nameEn: 'Brazil', capital: 'Brasília', continent: 'south_america', flagEmoji: '🇧🇷', svgPath: '', difficulty: 1 },
    { id: 'AR', nameFr: 'Argentine', nameEn: 'Argentina', capital: 'Buenos Aires', continent: 'south_america', flagEmoji: '🇦🇷', svgPath: '', difficulty: 1 },
    { id: 'CL', nameFr: 'Chili', nameEn: 'Chile', capital: 'Santiago', continent: 'south_america', flagEmoji: '🇨🇱', svgPath: '', difficulty: 2 },
    { id: 'CO', nameFr: 'Colombie', nameEn: 'Colombia', capital: 'Bogota', continent: 'south_america', flagEmoji: '🇨🇴', svgPath: '', difficulty: 2 },
    { id: 'PE', nameFr: 'Pérou', nameEn: 'Peru', capital: 'Lima', continent: 'south_america', flagEmoji: '🇵🇪', svgPath: '', difficulty: 2 },
    { id: 'VE', nameFr: 'Venezuela', nameEn: 'Venezuela', capital: 'Caracas', continent: 'south_america', flagEmoji: '🇻🇪', svgPath: '', difficulty: 2 },
    { id: 'EC', nameFr: 'Équateur', nameEn: 'Ecuador', capital: 'Quito', continent: 'south_america', flagEmoji: '🇪🇨', svgPath: '', difficulty: 3 },
    { id: 'BO', nameFr: 'Bolivie', nameEn: 'Bolivia', capital: 'La Paz', continent: 'south_america', flagEmoji: '🇧🇴', svgPath: '', difficulty: 3 },
    { id: 'PY', nameFr: 'Paraguay', nameEn: 'Paraguay', capital: 'Asunción', continent: 'south_america', flagEmoji: '🇵🇾', svgPath: '', difficulty: 4 },
    { id: 'UY', nameFr: 'Uruguay', nameEn: 'Uruguay', capital: 'Montevideo', continent: 'south_america', flagEmoji: '🇺🇾', svgPath: '', difficulty: 3 },
    { id: 'GY', nameFr: 'Guyana', nameEn: 'Guyana', capital: 'Georgetown', continent: 'south_america', flagEmoji: '🇬🇾', svgPath: '', difficulty: 4 },
    { id: 'SR', nameFr: 'Suriname', nameEn: 'Suriname', capital: 'Paramaribo', continent: 'south_america', flagEmoji: '🇸🇷', svgPath: '', difficulty: 5 },
    { id: 'GF', nameFr: 'Guyane française', nameEn: 'French Guiana', capital: 'Cayenne', continent: 'south_america', flagEmoji: '🇬🇫', svgPath: '', difficulty: 5 },

    // ==========================================
    // OCEANIA (14 pays)
    // ==========================================
    { id: 'AU', nameFr: 'Australie', nameEn: 'Australia', capital: 'Canberra', continent: 'oceania', flagEmoji: '🇦🇺', svgPath: '', difficulty: 1 },
    { id: 'NZ', nameFr: 'Nouvelle-Zélande', nameEn: 'New Zealand', capital: 'Wellington', continent: 'oceania', flagEmoji: '🇳🇿', svgPath: '', difficulty: 1 },
    { id: 'PG', nameFr: 'Papouasie-Nouvelle-Guinée', nameEn: 'Papua New Guinea', capital: 'Port Moresby', continent: 'oceania', flagEmoji: '🇵🇬', svgPath: '', difficulty: 3 },
    { id: 'FJ', nameFr: 'Fidji', nameEn: 'Fiji', capital: 'Suva', continent: 'oceania', flagEmoji: '🇫🇯', svgPath: '', difficulty: 4 },
    { id: 'SB', nameFr: 'Îles Salomon', nameEn: 'Solomon Islands', capital: 'Honiara', continent: 'oceania', flagEmoji: '🇸🇧', svgPath: '', difficulty: 5 },
    { id: 'VU', nameFr: 'Vanuatu', nameEn: 'Vanuatu', capital: 'Port-Vila', continent: 'oceania', flagEmoji: '🇻🇺', svgPath: '', difficulty: 5 },
    { id: 'WS', nameFr: 'Samoa', nameEn: 'Samoa', capital: 'Apia', continent: 'oceania', flagEmoji: '🇼🇸', svgPath: '', difficulty: 5 },
    { id: 'TO', nameFr: 'Tonga', nameEn: 'Tonga', capital: 'Nukualofa', continent: 'oceania', flagEmoji: '🇹🇴', svgPath: '', difficulty: 5 },
    { id: 'KI', nameFr: 'Kiribati', nameEn: 'Kiribati', capital: 'Tarawa', continent: 'oceania', flagEmoji: '🇰🇮', svgPath: '', difficulty: 6 },
    { id: 'FM', nameFr: 'Micronésie', nameEn: 'Micronesia', capital: 'Palikir', continent: 'oceania', flagEmoji: '🇫🇲', svgPath: '', difficulty: 6 },
    { id: 'PW', nameFr: 'Palaos', nameEn: 'Palau', capital: 'Ngerulmud', continent: 'oceania', flagEmoji: '🇵🇼', svgPath: '', difficulty: 6 },
    { id: 'MH', nameFr: 'Îles Marshall', nameEn: 'Marshall Islands', capital: 'Majuro', continent: 'oceania', flagEmoji: '🇲🇭', svgPath: '', difficulty: 6 },
    { id: 'NR', nameFr: 'Nauru', nameEn: 'Nauru', capital: 'Yaren', continent: 'oceania', flagEmoji: '🇳🇷', svgPath: '', difficulty: 6 },
    { id: 'TV', nameFr: 'Tuvalu', nameEn: 'Tuvalu', capital: 'Funafuti', continent: 'oceania', flagEmoji: '🇹🇻', svgPath: '', difficulty: 6 },
];

// Helpers
export const getCountryById = (id: string): Country | undefined =>
    countries.find(c => c.id === id);

export const getCountriesByContinent = (continent: Continent): Country[] =>
    countries.filter(c => c.continent === continent);

export const getCountriesSortedByDifficulty = (): Country[] =>
    [...countries].sort((a, b) => a.difficulty - b.difficulty);

export const shuffleCountries = (list: Country[]): Country[] => {
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};
