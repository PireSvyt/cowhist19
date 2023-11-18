import Cookies from "js-cookie";
// APIs
import {
  apiAuthSignUp,
  apiAuthExistingPseudo,
  apiAuthActivate,
  apiAuthSendActivation,
  apiAuthSignIn,
  apiAuthSendPassword,
  apiAuthAssess,
} from "./auth.api.js";
// Services
import { random_id, validateEmail } from "../_miscelaneous/toolkit.js";
import { serviceAuthGrantAccess } from "./auth.services.js"
import appStore from "../../store/appStore.js";

export const authSignupInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "authSignupInputs.lockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({ type: "signupModalSlice/lock" });
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "authSignupInputs.unlockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({
      type: "signupModalSlice/change",
      payload: {
        disabled: false,
        loading: false,
      },
    });
  },
  getinputsfunction: (log) => {
    log.push({
      date: new Date(),
      message: "authSignupInputs.getinputsfunction",
      tags: ["function"],
    });
    return {
      inputs: { ...appStore.getState().signupModalSlice.inputs }
    };
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: "inputs",
      error: "generic.error.missinginputs",
      subchecks: [
        {
          // Check pseudo is available
          field: "pseudo",
          error: "generic.error.missingpseudo",
          fieldsinerror: ["pseudo"],
        },
        {
          // Check login is available
          field: "login",
          error: "generic.error.missinlogin",
          fieldsinerror: ["login"],
          subchecks: [
            {
              // Check email validity
              checkfunction: (serviceInputs) => {
                if (!validateEmail(serviceInputs.inputs.login)) {
                  return "fail";
                } else {
                  return "pass";
                }
              },
              error: "generic.error.invalidlogin",
              fieldsinerror: ["login"],
            }
          ]
        },
        {
          // Check password is available
          field: "password",
          error: "generic.error.missingpassword",
          fieldsinerror: ["password"],
        },
        {
          // Check passwordrepeat is available
          field: "passwordrepeat",
          error: "generic.error.missingpasswordrepeat",
          fieldsinerror: ["passwordrepeat"],
          subchecks: [
            {
              // Check password match
              checkfunction: (serviceInputs) => {
                if (serviceInputs.inputs.password !== serviceInputs.inputs.passwordrepeat) {
                  return "fail";
                } else {
                  return "pass";
                }
              },
              error: "generic.error.passwordmissmatch",
              fieldsinerror: ["passwordrepeat"],
            }
          ]
        }
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: "authSignupInputs.getcheckoutcomedispatchfunction",
      tags: ["function"],
    });
    return "signupModalSlice/change";
  },
  repackagingfunction: (inputs, log) => {
    log.push({
      date: new Date(),
      message: "serviceProceed.repackagingfunction",
      inputs: inputs,
      tags: ["function"],
    });
    let repackagedInputs = inputs;
    //delete repackagedInputs.inputs.passwordrepeat 
    return repackagedInputs;
  },
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: "authSignupInputs.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    try {
      return await apiAuthSignUp(inputs);
    } catch (err) {
      return err;
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "authSignupInputs.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    let responses = {
      "auth.signup.success.signedup": () => {
          appStore.dispatch({
            type: "signupModalSlice/close"
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "signup.snack.signedup",
            },
          });
        },
        "auth.signup.success.alreadysignedup": () => {
          appStore.dispatch({
            type: "signupModalSlice/change",
            payload: {
              disabled: false,
              loading: false,
              errors: {
                alreadysignedup: true
              }
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "signup.snack.signedup",
            },
          });
        },
        "auth.signup.error.savingoncreate": () => {
          appStore.dispatch({
            type: "signupModalSlice/change",
            payload: {
              disabled: false,
              loading: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "generic.snack.error.wip",
            },
          });
        },
        "auth.signup.error.savingfrominvited": () => {
          appStore.dispatch({
            type: "signupModalSlice/change",
            payload: {
              disabled: false,
              loading: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "generic.snack.error.wip",
            },
          });
        },
        "auth.signup.error.notfound": () => {
          appStore.dispatch({
            type: "signupModalSlice/change",
            payload: {
              disabled: false,
              loading: false,
            },
          });
          appStore.dispatch({
            type: "sliceSnack/change",
            payload: {
              uid: random_id(),
              id: "generic.snack.error.wip",
            },
          });
        },      
    };
    return responses[response];
  },
};

export const authSigninInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "authSigninInputs.lockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({ type: "signinModalSlice/lock" });
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "authSigninInputs.unlockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({
      type: "signinModalSlice/change",
      payload: {
        disabled: false,
        loading: false,
      },
    });
  },
  getinputsfunction: (log) => {
    log.push({
      date: new Date(),
      message: "authSigninInputs.getinputsfunction",
      tags: ["function"],
    });
    return {
      inputs: { ...appStore.getState().signinModalSlice.inputs }
    };
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: "inputs",
      error: "generic.error.missinginputs",
      subchecks: [
        {
          // Check login is available
          field: "login",
          error: "generic.error.missinlogin",
          fieldsinerror: ["login"],
          subchecks: [
            {
              // Check email validity
              checkfunction: (serviceInputs) => {
                if (!validateEmail(serviceInputs.inputs.login)) {
                  return "fail";
                } else {
                  return "pass";
                }
              },
              error: "generic.error.invalidlogin",
              fieldsinerror: ["login"],
            }
          ]
        },
        {
          // Check password is available
          field: "password",
          error: "generic.error.missingpassword",
          fieldsinerror: ["password"],
        },
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: "authSigninInputs.getcheckoutcomedispatchfunction",
      tags: ["function"],
    });
    return "signinModalSlice/change";
  },
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: "authSigninInputs.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    try {
      return await apiAuthSignIn(inputs);
    } catch (err) {
      return err;
    }    
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "authSigninInputs.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    console.log("response",response)
    let responses = {
      "auth.signin.success": () => {
        serviceAuthGrantAccess(response.data).then((proceedOutcome) => {
          if (proceedOutcome.errors.length > 0) {
            if (process.env.REACT_APP_DEBUG === "TRUE") {
              console.log("proceedOutcome errors", proceedOutcome.errors);
            }
            appStore.dispatch({
              type: "signinModalSlice/change",
              payload: {
                status: "error",
                /*errors: {
                  outcome : true
                }*/
              },
            });
            appStore.dispatch({
              type: "sliceSnack/change",
              payload: {
                uid: random_id(),
                id: "generic.snack.error.withdetails",
                details: proceedOutcome.errors,
              },
            });
          } else {
            // Signed in!
            Cookies.set("cowhist19_token", response.data.token);
            appStore.dispatch({
              type: "signinModalSlice/close",
            });
            if (window.location.href.search("activation")) {
              window.location = "/";
            }
          }
        });
      },
      "auth.signin.error.onfind": () => {
        appStore.dispatch({
          type: "signinModalSlice/change",
          payload: {
            status: "notfound",
            errors: {
              login: true
            }
          },
        });
      },
      "auth.signin.error.notfound": () => {
        appStore.dispatch({
          type: "signinModalSlice/change",
          payload: {
            status: "notfound",
            errors: {
              login: true
            }
          },
        });
      },
      "auth.signin.error.invalidpassword": () => {
        appStore.dispatch({
          type: "signinModalSlice/change",
          payload: {
            status: "denied",
            errors: {
              password: true
            }
          },
        });
      },
      "auth.signin.error.onpasswordcompare": () => {
        appStore.dispatch({
          type: "signinModalSlice/change",
          payload: {
            status: "denied",
            errors: {
              password: true
            }
          },
        });
      },
      "auth.signin.error.statussignedup": () => {
        appStore.dispatch({
          type: "signinModalSlice/change",
          payload: {
            status: "inactivated",
          },
        });
      },
      "auth.signin.error.statusunknown": () => {
        appStore.dispatch({
          type: "signinModalSlice/change",
          payload: {
            status: "inactivated",
          },
        });
      },
      
    };
    responses[response.type]()
    return
  },
};

export const authSendActivationInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "authSendActivationInputs.lockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({ 
      type: "signinModalSlice/lock", 
      payload: "sendactivation"
    });
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "authSendActivationInputs.unlockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({
      type: "signinModalSlice/change",
      payload: {
        sendactivation: {
          disabled: false,
          loading: false,
        }
      },
    });
  },
  getinputsfunction: (log) => {
    log.push({
      date: new Date(),
      message: "authSendActivationInputs.getinputsfunction",
      tags: ["function"],
    });
    return {
      inputs: { ...appStore.getState().signinModalSlice.inputs }
    };
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: "inputs",
      error: "generic.error.missinginputs",
      subchecks: [
        {
          // Check login is available
          field: "login",
          error: "generic.error.missinlogin",
          fieldsinerror: ["login"],
          subchecks: [
            {
              // Check email validity
              checkfunction: (serviceInputs) => {
                if (!validateEmail(serviceInputs.inputs.login)) {
                  return "fail";
                } else {
                  return "pass";
                }
              },
              error: "generic.error.invalidlogin",
              fieldsinerror: ["login"],
            }
          ]
        },
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: "authSendActivationInputs.getcheckoutcomedispatchfunction",
      tags: ["function"],
    });
    return "signinModalSlice/change";
  },
  apicall: (inputs, log) => {
    log.push({
      date: new Date(),
      message: "authSendActivationInputs.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    apiAuthSendActivation(inputs);
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "authSendActivationInputs.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    let responses = {
      "auth.sendactivation.success":() => {
        appStore.dispatch({
          type: "signinModalSlice/change",
          payload: {
            sendactivation: {
              loading: false,
              disbale: false,
            }
          },
        });
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "signin.snack.successresendingactivation",
          },
        });
      },
      "auth.sendactivation.error.onfind":() => {
        appStore.dispatch({
          type: "signinModalSlice/change",
          payload: {
            sendactivation: {
              loading: false,
              disbale: false,
            }
          },
        });
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "signin.snack.errorresendingactivation",
          },
        }); 
      },
      "auth.sendactivation.error.accountnotfound":() => {
        appStore.dispatch({
          type: "signinModalSlice/change",
          payload: {
            sendactivation: {
              loading: false,
              disbale: false,
            }
          },
        });
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "signin.snack.errorresendingactivation",
          },
        }); 
      },
      "auth.sendactivation.error.updatingtoken":() => {
        appStore.dispatch({
          type: "signinModalSlice/change",
          payload: {
            sendactivation: {
              loading: false,
              disbale: false,
            }
          },
        });
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "signin.snack.errorresendingactivation",
          },
        }); 
      },
    };
    return responses[response];
  },
};

export const authSendPasswordInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "authSendPasswordInputs.lockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({ 
      type: "signinModalSlice/lock",
      payload: "sendpassword" 
    });
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: "authSendPasswordInputs.unlockuifunction",
      tags: ["function"],
    });
    appStore.dispatch({
      type: "signinModalSlice/change",
      payload: {
        sendpassword: {
          disabled: false,
          loading: false,
        }
      },
    });
  },
  getinputsfunction: (log) => {
    log.push({
      date: new Date(),
      message: "authSendPasswordInputs.getinputsfunction",
      tags: ["function"],
    });
    return {
      inputs: { ...appStore.getState().signinModalSlice.inputs }
    };
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: "inputs",
      error: "generic.error.missinginputs",
      subchecks: [
        {
          // Check login is available
          field: "login",
          error: "generic.error.missinlogin",
          fieldsinerror: ["login"],
          subchecks: [
            {
              // Check email validity
              checkfunction: (serviceInputs) => {
                if (!validateEmail(serviceInputs.inputs.login)) {
                  return "fail";
                } else {
                  return "pass";
                }
              },
              error: "generic.error.invalidlogin",
              fieldsinerror: ["login"],
            }
          ]
        },
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: "authSendPasswordInputs.getcheckoutcomedispatchfunction",
      tags: ["function"],
    });
    return "signinModalSlice/change";
  },
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: "authSendPasswordInputs.apicall",
      inputs: inputs,
      tags: ["function"],
    });
    try {
      return await apiAuthSendPassword(inputs);
    } catch (err) {
      return err;
    }    
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: "authSendPasswordInputs.getmanageresponsefunction",
      response: response,
      tags: ["function"],
    });
    let responses = {
      "auth.sendpassword.success":() => {
        appStore.dispatch({
          type: "signinModalSlice/change",
          payload: {
            sendpassword: {
              status: "sent",
            }
          },
        });
      },
      "auth.sendpassword.error.onfind":() => {
        appStore.dispatch({
          type: "signinModalSlice/change",
          payload: {
            sendpassword: {
              status: "notfound",
            }
          },
        });
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "signin.snack.errorsendingpassword",
          },
        });
      },
      "auth.sendpassword.error.accountnotfound":() => {
        appStore.dispatch({
          type: "signinModalSlice/change",
          payload: {
            sendpassword: {
              status: "notfound",
            },
            errors: {
              login: true
            }
          },
        });
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "signin.snack.errorsendingpassword",
          },
        });
      },
      "auth.sendpassword.error.updatingtoken":() => {
        appStore.dispatch({
          type: "signinModalSlice/change",
          payload: {
            sendpassword: {
              status: "notfound",
            }
          },
        });
        appStore.dispatch({
          type: "sliceSnack/change",
          payload: {
            uid: random_id(),
            id: "signin.snack.errorsendingpassword",
          },
        });
      },
    };
    console.log("response", response)
    responses[response]()
    return 
  },
};