const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('src/assets/countries_raw_50m.json', 'utf8'));

// Copy mappings from existing script
const countryMap = {
    'France': 'FR', 'Germany': 'DE', 'Italy': 'IT', 'Spain': 'ES',
    'United Kingdom': 'GB', 'Portugal': 'PT', 'Belgium': 'BE', 'Netherlands': 'NL',
    'Switzerland': 'CH', 'Austria': 'AT', 'Poland': 'PL', 'Sweden': 'SE',
    'Norway': 'NO', 'Greece': 'GR', 'Denmark': 'DK', 'Finland': 'FI',
    'Ireland': 'IE', 'Czechia': 'CZ', 'Czech Rep.': 'CZ', 'Hungary': 'HU',
    'Romania': 'RO', 'Ukraine': 'UA', 'Turkey': 'TR',
    'Bulgaria': 'BG', 'Croatia': 'HR', 'Slovakia': 'SK', 'Slovenia': 'SI',
    'Serbia': 'RS', 'Bosnia and Herz.': 'BA', 'Albania': 'AL',
    'North Macedonia': 'MK', 'Macedonia': 'MK', 'Montenegro': 'ME',
    'Lithuania': 'LT', 'Latvia': 'LV', 'Estonia': 'EE', 'Belarus': 'BY',
    'Moldova': 'MD', 'Luxembourg': 'LU', 'Malta': 'MT', 'Cyprus': 'CY',
    'Iceland': 'IS', 'Kosovo': 'XK',
    'Monaco': 'MC', 'Andorra': 'AD', 'Liechtenstein': 'LI',
    'San Marino': 'SM', 'Vatican': 'VA', 'Holy See': 'VA',
    'China': 'CN', 'Japan': 'JP', 'India': 'IN', 'South Korea': 'KR', 'Korea': 'KR',
    'Thailand': 'TH', 'Vietnam': 'VN', 'Indonesia': 'ID', 'Russia': 'RU',
    'Malaysia': 'MY', 'Philippines': 'PH', 'Myanmar': 'MM', 'Bangladesh': 'BD',
    'Pakistan': 'PK', 'Afghanistan': 'AF', 'Iran': 'IR', 'Iraq': 'IQ',
    'Saudi Arabia': 'SA', 'United Arab Emirates': 'AE', 'Israel': 'IL',
    'Jordan': 'JO', 'Syria': 'SY', 'Lebanon': 'LB', 'Kuwait': 'KW',
    'Oman': 'OM', 'Yemen': 'YE', 'Kazakhstan': 'KZ', 'Uzbekistan': 'UZ',
    'Turkmenistan': 'TM', 'Tajikistan': 'TJ', 'Kyrgyzstan': 'KG',
    'Mongolia': 'MN', 'Nepal': 'NP', 'Sri Lanka': 'LK', 'Cambodia': 'KH',
    'Laos': 'LA', 'North Korea': 'KP', 'Dem. Rep. Korea': 'KP', 'N. Korea': 'KP',
    'Taiwan': 'TW', 'Singapore': 'SG', 'Brunei': 'BN', 'Bhutan': 'BT',
    'Qatar': 'QA', 'Bahrain': 'BH', 'Azerbaijan': 'AZ', 'Armenia': 'AM',
    'Georgia': 'GE', 'Timor-Leste': 'TL',
    'Egypt': 'EG', 'South Africa': 'ZA', 'Morocco': 'MA', 'Nigeria': 'NG',
    'Kenya': 'KE', 'Ethiopia': 'ET', 'Algeria': 'DZ', 'Tunisia': 'TN',
    'Libya': 'LY', 'Sudan': 'SD', 'S. Sudan': 'SS', 'South Sudan': 'SS',
    'Ghana': 'GH', 'Cameroon': 'CM', 'Ivory Coast': 'CI', "Côte d'Ivoire": 'CI',
    'Senegal': 'SN', 'Mali': 'ML', 'Niger': 'NE', 'Burkina Faso': 'BF',
    'Chad': 'TD', 'Madagascar': 'MG', 'Angola': 'AO', 'Mozambique': 'MZ',
    'Tanzania': 'TZ', 'Uganda': 'UG', 'Zimbabwe': 'ZW', 'Zambia': 'ZM',
    'Dem. Rep. Congo': 'CD', 'Congo': 'CG', 'Gabon': 'GA',
    'Botswana': 'BW', 'Namibia': 'NA', 'Rwanda': 'RW', 'Burundi': 'BI',
    'Benin': 'BJ', 'Togo': 'TG', 'Sierra Leone': 'SL', 'Liberia': 'LR',
    'Central African Rep.': 'CF', 'Eritrea': 'ER', 'Djibouti': 'DJ',
    'Somalia': 'SO', 'Somaliland': 'SO', 'Mauritania': 'MR', 'W. Sahara': 'EH',
    'Malawi': 'MW', 'Lesotho': 'LS', 'Eswatini': 'SZ', 'Swaziland': 'SZ',
    'Guinea': 'GN', 'Guinea-Bissau': 'GW', 'Gambia': 'GM', 'Eq. Guinea': 'GQ',
    'Mauritius': 'MU', 'Cape Verde': 'CV', 'Comoros': 'KM', 'Seychelles': 'SC',
    'United States of America': 'US', 'United States': 'US', 'Canada': 'CA',
    'Mexico': 'MX', 'Cuba': 'CU', 'Haiti': 'HT', 'Dominican Rep.': 'DO',
    'Jamaica': 'JM', 'Puerto Rico': 'PR', 'Guatemala': 'GT', 'Honduras': 'HN',
    'El Salvador': 'SV', 'Nicaragua': 'NI', 'Costa Rica': 'CR', 'Panama': 'PA',
    'Belize': 'BZ', 'Bahamas': 'BS', 'Trinidad and Tobago': 'TT',
    'Barbados': 'BB', 'Greenland': 'GL',
    'Brazil': 'BR', 'Argentina': 'AR', 'Chile': 'CL', 'Colombia': 'CO',
    'Peru': 'PE', 'Venezuela': 'VE', 'Ecuador': 'EC', 'Bolivia': 'BO',
    'Paraguay': 'PY', 'Uruguay': 'UY', 'Guyana': 'GY', 'Suriname': 'SR',
    'Falkland Is.': 'FK', 'French Guiana': 'GF',
    'Australia': 'AU', 'New Zealand': 'NZ', 'Papua New Guinea': 'PG',
    'Fiji': 'FJ', 'Solomon Is.': 'SB', 'Vanuatu': 'VU', 'New Caledonia': 'NC',
    'Samoa': 'WS', 'Tonga': 'TO', 'Micronesia': 'FM', 'Palau': 'PW',
    'Marshall Is.': 'MH', 'Kiribati': 'KI', 'Nauru': 'NR', 'Tuvalu': 'TV',
};

const iso3Map = {
    'FRA': 'FR', 'DEU': 'DE', 'ITA': 'IT', 'ESP': 'ES', 'GBR': 'GB',
    'PRT': 'PT', 'BEL': 'BE', 'NLD': 'NL', 'CHE': 'CH', 'AUT': 'AT',
    'POL': 'PL', 'SWE': 'SE', 'NOR': 'NO', 'GRC': 'GR', 'DNK': 'DK',
    'FIN': 'FI', 'IRL': 'IE', 'CZE': 'CZ', 'HUN': 'HU', 'ROU': 'RO',
    'UKR': 'UA', 'RUS': 'RU', 'TUR': 'TR', 'BGR': 'BG', 'HRV': 'HR',
    'SVK': 'SK', 'SVN': 'SI', 'SRB': 'RS', 'BIH': 'BA', 'ALB': 'AL',
    'MKD': 'MK', 'MNE': 'ME', 'LTU': 'LT', 'LVA': 'LV', 'EST': 'EE',
    'BLR': 'BY', 'MDA': 'MD', 'LUX': 'LU', 'MLT': 'MT', 'CYP': 'CY',
    'ISL': 'IS', 'MCO': 'MC', 'AND': 'AD', 'LIE': 'LI', 'SMR': 'SM', 'VAT': 'VA',
    'CHN': 'CN', 'JPN': 'JP', 'IND': 'IN', 'KOR': 'KR', 'THA': 'TH',
    'VNM': 'VN', 'IDN': 'ID', 'MYS': 'MY', 'PHL': 'PH', 'MMR': 'MM',
    'BGD': 'BD', 'PAK': 'PK', 'AFG': 'AF', 'IRN': 'IR', 'IRQ': 'IQ',
    'SAU': 'SA', 'ARE': 'AE', 'ISR': 'IL', 'JOR': 'JO', 'SYR': 'SY',
    'LBN': 'LB', 'KWT': 'KW', 'OMN': 'OM', 'YEM': 'YE', 'KAZ': 'KZ',
    'UZB': 'UZ', 'TKM': 'TM', 'TJK': 'TJ', 'KGZ': 'KG', 'MNG': 'MN',
    'NPL': 'NP', 'LKA': 'LK', 'KHM': 'KH', 'LAO': 'LA', 'PRK': 'KP',
    'TWN': 'TW', 'SGP': 'SG', 'BRN': 'BN', 'BTN': 'BT', 'QAT': 'QA',
    'BHR': 'BH', 'AZE': 'AZ', 'ARM': 'AM', 'GEO': 'GE', 'TLS': 'TL',
    'EGY': 'EG', 'ZAF': 'ZA', 'MAR': 'MA', 'NGA': 'NG', 'KEN': 'KE',
    'ETH': 'ET', 'DZA': 'DZ', 'TUN': 'TN', 'LBY': 'LY', 'SDN': 'SD',
    'SSD': 'SS', 'GHA': 'GH', 'CMR': 'CM', 'CIV': 'CI', 'SEN': 'SN',
    'MLI': 'ML', 'NER': 'NE', 'BFA': 'BF', 'TCD': 'TD', 'MDG': 'MG',
    'AGO': 'AO', 'MOZ': 'MZ', 'TZA': 'TZ', 'UGA': 'UG', 'ZWE': 'ZW',
    'ZMB': 'ZM', 'COD': 'CD', 'COG': 'CG', 'GAB': 'GA', 'BWA': 'BW',
    'NAM': 'NA', 'RWA': 'RW', 'BDI': 'BI', 'BEN': 'BJ', 'TGO': 'TG',
    'SLE': 'SL', 'LBR': 'LR', 'CAF': 'CF', 'ERI': 'ER', 'DJI': 'DJ',
    'SOM': 'SO', 'MRT': 'MR', 'ESH': 'EH', 'MWI': 'MW', 'LSO': 'LS',
    'SWZ': 'SZ', 'GIN': 'GN', 'GNB': 'GW', 'GMB': 'GM', 'GNQ': 'GQ',
    'MUS': 'MU', 'CPV': 'CV', 'COM': 'KM', 'SYC': 'SC',
    'USA': 'US', 'CAN': 'CA', 'MEX': 'MX', 'CUB': 'CU', 'HTI': 'HT',
    'DOM': 'DO', 'JAM': 'JM', 'PRI': 'PR', 'GTM': 'GT', 'HND': 'HN',
    'SLV': 'SV', 'NIC': 'NI', 'CRI': 'CR', 'PAN': 'PA', 'BLZ': 'BZ',
    'BHS': 'BS', 'TTO': 'TT', 'BRB': 'BB', 'GRL': 'GL',
    'BRA': 'BR', 'ARG': 'AR', 'CHL': 'CL', 'COL': 'CO', 'PER': 'PE',
    'VEN': 'VE', 'ECU': 'EC', 'BOL': 'BO', 'PRY': 'PY', 'URY': 'UY',
    'GUY': 'GY', 'SUR': 'SR', 'FLK': 'FK', 'GUF': 'GF',
    'AUS': 'AU', 'NZL': 'NZ', 'PNG': 'PG', 'FJI': 'FJ', 'SLB': 'SB',
    'VUT': 'VU', 'NCL': 'NC', 'WSM': 'WS', 'TON': 'TO', 'FSM': 'FM',
    'PLW': 'PW', 'MHL': 'MH', 'KIR': 'KI', 'NRU': 'NR', 'TUV': 'TV',
};

function simplifyCoords(coords, precision = 4) {
    if (typeof coords[0] === 'number') {
        return [
            Math.round(coords[0] * Math.pow(10, precision)) / Math.pow(10, precision),
            Math.round(coords[1] * Math.pow(10, precision)) / Math.pow(10, precision)
        ];
    }
    return coords.map(c => simplifyCoords(c, precision));
}

const features = [];
const found = new Set();

for (const f of raw.features) {
    const props = f.properties || {};
    const name = props.NAME || props.ADMIN || props.name;
    let iso3 = props.ISO_A3 !== '-99' ? props.ISO_A3 : props.ADM0_A3;
    if (!iso3) iso3 = props.ADM0_A3;

    let iso2 = countryMap[name] || iso3Map[iso3];

    if (!iso2) continue;
    if (found.has(iso2)) continue;

    const geom = f.geometry;
    if (!geom || !geom.coordinates) continue;

    // French Guiana extraction
    if (iso3 === 'FRA' && geom.type === 'MultiPolygon') {
        const guianaIndex = geom.coordinates.findIndex(poly => {
            const pt = poly[0][0];
            return pt[0] < -50 && pt[1] > 0 && pt[1] < 10;
        });

        if (guianaIndex !== -1) {
            const guianaPoly = geom.coordinates[guianaIndex];
            if (!found.has('GF')) {
                features.push({
                    type: "Feature",
                    id: "GF",
                    properties: { name: "French Guiana" },
                    geometry: {
                        type: "Polygon",
                        coordinates: simplifyCoords(guianaPoly, 4)
                    }
                });
                found.add('GF');
            }
            geom.coordinates.splice(guianaIndex, 1);
        }
    }

    found.add(iso2);

    features.push({
        type: "Feature",
        id: iso2,
        properties: { name: name },
        geometry: {
            type: geom.type,
            coordinates: simplifyCoords(geom.coordinates, 4)
        }
    });
}

const output = `// GeoJSON - Lat/Lng Resolution (Simplified for react-native-maps)
// ${features.length} countries

export default ${JSON.stringify({ type: "FeatureCollection", features }, null, 2)};
`;

fs.writeFileSync('src/assets/world_latlng.ts', output);
console.log(`Exported ${features.length} countries in Lat/Lng format`);
