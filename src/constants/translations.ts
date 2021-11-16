import Config from "./Config";

const translations = {
  en: {
    translation: {
      navbar: {
        "sign_up": "Sign Up",
        "log_in": "log in",
        "offers": "offers",
        "agencies": "agencies",
        "blog": "blog",
      },

      landing_page: {
        first_section: {
          "main_header_text": "... for agents, for clients, for ",
          "main_everyone": "everyone",
          "main_paragraph_text": "Discover the easiest way to run your agancy or search for real estate of your dreams.",
        }
      },

      sign_up_page: {
        title_sign: 'Sign ',
        title_up: 'Up',
        subtitle: '...or if you already have an account ',
        log_in: 'log in',
        sign_up_form_title: 'Sign up as ',
        user: {
          title: Config.ACCOUNT_NAME_USER,
          content: 'For people that want to browse through the offers more effectively or ask some questions on the blog.',
          button_text: 'register new user',
          pros: 'browse offers;contact with agents;use chat;send documents'
        },
        agent: {
          title: Config.ACCOUNT_NAME_AGENT,
          content: 'For real estate agents who already have a job ...or are currently looking for new agency to employ them.',
          button_text: 'register new agent',
          pros: 'add offers;work with agency;generate documents;answer blog questions'
        },
        agency: {
          title: Config.ACCOUNT_NAME_AGENCY,
          content: 'For agency owners, managers or simply administration workers looking for nice and effective CRM tool.',
          button_text: 'register new agency',
          pros: 'run your agency;monitor agents work;generate raports;manage agency'
        },
        form: {
          button: 'Submit',
          label: {
            username: 'username',
            e_mail: 'e-mail',
            password: 'password',
            confirm_password: 'confirm password'
          },
          error_message: {
            username: {
              too_short: 'username should have at least 6 characters',
              already_taken: 'username already taken'
            },
            email: {
              email_invalid: 'email is invalid',
              alredy_exists: 'account with that email already exists'
            },
            password: {
              too_short: 'password should have at least 8 characters',
              uppercase: 'password should have at least one uppercase character',
              confirmed: 'confirmed password should be the same as password'
            }
          }
        }
      },

      log_in_page: {
        log_in_form_title: 'Log In',
        form: {
          button: 'Log in',
          label: {
            username: 'username',
            password: 'password',
          },
        }
      },

      offers_page: {
        add_new_offer: 'Add an offer',
      },

      offer_creation_page: {
        create_new_offer: 'Create new offer',
        real_estate_category: 'category',
        title: 'title',
        description: 'description',
        furnished: 'furnished',
        area: 'area',
        floor: 'floor',
        rooms: 'rooms',
        offer_type: 'offer type',
        price: 'price',
        negotiable: 'negotiable',
        offer_categories: {
          agricultural: 'agricultural',
          residental: 'residental',
          commercial: 'commercial',
          industrial: 'industrial',
          raw_land: 'raw land',
          special_use: 'special use'
        },
        offer_types: {
          disposal: 'disposal',
          rent: 'rent'
        },
        per_month: '/month',
        address: 'address'
      }
    }
  },
  pl: {
    translation: {
      // ...polish translations here
    }
  }
};

export default translations;