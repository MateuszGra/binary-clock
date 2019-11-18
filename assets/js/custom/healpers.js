  //auxiliary function to round results
  const round = (n, k) => {
      const factor = Math.pow(10, k);
      return Math.round(n * factor) / factor;
  }

  //auxiliary function to change country code to full country name
  const decodeCountry = (n) => {
      const countryCode = ['AF', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'HR', 'CU', 'CW', 'CY', 'CZ', 'CI', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MK', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RO', 'RU', 'RW', 'RE', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'UY', 'UZ', 'VU', 'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW', 'AX'];
      const country = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia, Plurinational State of', 'Bonaire, Sint Eustatius and Saba', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, the Democratic Republic of the', 'Cook Islands', 'Costa Rica', 'Croatia', 'Cuba', 'Curaçao', 'Cyprus', 'Czechia', 'Côte d’Ivoire', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and McDonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran, Islamic Republic of', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, Democratic People’s Republic of', 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', 'Lao People’s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia, the former Yugoslav Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory, Occupied', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Romania', 'Russian Federation', 'Rwanda', 'Réunion', 'Saint Barthélemy', 'Saint Helena, Ascension and Tristan da Cunha', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin (French part)', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten (Dutch part)', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela, Bolivarian Republic of', 'Viet Nam', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe', 'Åland Islands'];

      for (let i = 0; i < country.length; i++) {
          if (n == countryCode[i]) return country[i];
      }
      return n;
  }

  //auxiliary function to change wind deg to direction
  const windDirection = (n) => {
      if (n > 11.25 && n <= 33.75) {
          return 'NNE';
      } else if (n > 33.75 && n <= 56.25) {
          return 'NE';
      } else if (n > 56.25 && n <= 78.75) {
          return 'ENE';
      } else if (n > 78.75 && n <= 101.25) {
          return 'E';
      } else if (n > 101.25 && n <= 123.75) {
          return 'ESE';
      } else if (n > 123.75 && n <= 146.25) {
          return 'SE';
      } else if (n > 146.25 && n <= 168.75) {
          return 'SSE';
      } else if (n > 168.75 && n <= 191.25) {
          return 'S';
      } else if (n > 191.25 && n <= 213.75) {
          return 'SSW';
      } else if (n > 213.75 && n <= 236.25) {
          return 'SW';
      } else if (n > 236.25 && n <= 258.75) {
          return 'WSW';
      } else if (n > 258.75 && n <= 281.25) {
          return 'W';
      } else if (n > 281.25 && n <= 303.75) {
          return 'WNW';
      } else if (n > 303.75 && n <= 326.25) {
          return 'NW';
      } else if (n > 326.25 && n <= 348.75) {
          return 'NNW';
      } else if (n > 348.75 || n <= 11.25) {
          return 'N';
      }
  }

  //auxiliary function to delete if some API info is not defined
  const delUndefined = (n, y) => {
      if (n == undefined) {
          y = '';
      }
      return y;
  }

  //auxiliary function to add zero to result (3am to 03am)
  const addZero = (n) => {
      if (n < 10) {
          n = '0' + n;
      }
      return n;
  }

  const changeIcon = (n) => {

      const weatherIcon = document.querySelector('.weather-icon');
      const weatherCode = [{
              code: '03d',
              icon: 'fa-cloud',
          },
          {
              code: '03n',
              icon: 'fa-cloud',
          },
          {
              code: '04d',
              icon: 'fa-cloud',
          },
          {
              code: '04n',
              icon: 'fa-cloud',
          },
          {
              code: '01d',
              icon: 'fa-sun',
          },
          {
              code: '01n',
              icon: 'fa-moon',
          },
          {
              code: '02d',
              icon: 'fa-cloud-sun',
          },
          {
              code: '02n',
              icon: 'fa-cloud-moon',
          },
          {
              code: '09d',
              icon: 'fa-cloud-showers-heavy',
          },
          {
              code: '09n',
              icon: 'fa-cloud-showers-heavy',
          },
          {
              code: '10d',
              icon: 'fa-cloud-sun-rain',
          },
          {
              code: '10n',
              icon: 'fa-cloud-moon-rain',
          },
          {
              code: '11d',
              icon: 'fa-bolt',
          },
          {
              code: '11n',
              icon: 'fa-bolt',
          },
          {
              code: '13d',
              icon: 'fa-snowflake',
          },
          {
              code: '13n',
              icon: 'fa-snowflake',
          },
          {
              code: '50d',
              icon: 'fa-smog',
          },
          {
              code: '50n',
              icon: 'fa-smog',
          },
          {
              code: 'error',
              icon: 'fa-exclamation-triangle',
          },
      ];

      weatherCode.forEach((code) => {
          weatherIcon.classList.remove(code.icon);
      });

      for (let i = 0; i < weatherCode.length; i++) {
          if (n == weatherCode[i].code) {
              weatherIcon.classList.add(weatherCode[i].icon);
              break;
          }
      }

  }