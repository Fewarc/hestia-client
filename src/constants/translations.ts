const translations = {
  en: {
    translation: {
      navbar: {
        "sign_up": "Sign Up",
        "log_in": "log in",
        "oferts": "oferts",
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
          title: 'user',
          content: 'For people that want to browse through the oferts more effectively or ask some questions on the blog.',
          button_text: 'register new user',
          pros: 'browse oferts;contact with agents;use chat;send documents'
        },
        agent: {
          title: 'agent',
          content: 'For real estate agents who already have a job ...or are currently looking for new agency to employ them.',
          button_text: 'register new agent',
          pros: 'add oferts;work with agency;generate documents;answer blog questions'
        },
        agency: {
          title: 'agency',
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