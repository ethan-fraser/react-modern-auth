# React Modern Auth

A plug-n-play authentication component for React with log in and sign up pages. Powered by the backend of your choice via custom callbacks.

Features include:
 - Customisable sign-up fields
 - Optional SSO providers
 - Password reset requesting
 - Mobile-first responsive design
 - Built-in sign-up form validation

## Usage
``` typescript
import {
  ReactModernAuth,
  AuthConfig,
  SignUpData,
} from "react-modern-auth";
import LoadingSpinner from "./components/LoadingSpinner";
import useAuth from "./hooks/useAuth";

export default function App() {
  const { isLoading } = useAuth();
  const authConfig: AuthConfig = {
    signUpFields: [
      {
        type: "name",
        required: true,
      },
      {
        type: "email",
        required: true
      },
    ],
    enableSignUpValidation: true,
    handlers: {
      authWithPassword: async (email: string, password: string) => {
        // Pass on to your backend and return an AuthResponse object
        return { success: true };
      },
      signUp: async (data: SignUpData) => {
        // Pass on to your backend and return a SignUpResponse object
        return { success: true };
      },
      requestPasswordReset: async (email: string) => {
        // Handle password reset request
      }
    }
  }

  return (
    <ReactModernAuth
      config={authConfig}
      isLoading={isLoading}
      loadingComponent={<LoadingSpinner />}
    />
  );
}
```

## `AuthConfig` options
### `signUpFields`
Sign up fields are defined by one of the following:
| Type                 | Input Type | Parameters | Description |
|----------------------|------------|------------|-------------|
| email (optional)          | text       | `required`: boolean |    |
| name (optional)           | text       | `required`: boolean |    |
| firstName (optional)      | text       | `required`: boolean | If provided, `lastName` is also required and they will be rendered side-by-side. |
| lastName (optional)       | text       | `required`: boolean | If provided, `firstName` is also required and they will be rendered side-by-side. |
| username (optional)       | text       | `required`: boolean |    |
| avatar (optional)         | file       | `required`: boolean, `maxMB`: number | `maxMB` can be specified to limit the size of the file attached. |
| termsAccepted (optional)  | checkbox   | `privacyPolicyURL`: string, `termsAndConditionsURL`: string | Links to `privacyPolicyURL` and/or `termsAndConditionsURL` can be provided. Field required if validation is enabled. |
| password             | password   | | Must be longer than 8 characters if validation is enabled. Does not need to be included in `authConfig.signUpFields` since it is non-optional. |
| passwordConfirm      | password   | | Must match the `password` field if validation is enabled. Does not need to be included in `authConfig.signUpFields` since it is non-optional. |

Each field can be included as an object in the following form:
```javascript
{
  type: "<field type>",
  required: true/false,
  otherParameter: "<value>"
}
```

### `enableSignUpValidation`
A boolean flag to automatically validate form fields on sign up. Defaults to `false`, in which case you can provide your own validation by returning errors from your `signUp` handler for each field. See the handlers section for details.

### `oAuthProviders`
An array of oAuth SSO providers. If empty, the option will not be given to authenticate using SSO. If you choose to provide options for SSO, they should be included as objects of the following form:
``` javascript
{
  name: string, // The name of the provider. This will be passed to your authWithOAuth handler in the `provider` argument.
  logoSrc: string // The location of an image to present to the user.
}
```

### `handlers`
The following handlers are how you deal with user interaction:
| Handler | Parameters | Return type | Description |
|-----------------|------------|-------------|-------------|
| authWithPassword | `email`: string, `password`: string | `AuthResponse` | |
| authWithOAuth (optional) | `provider`: string | `AuthResponse`   | `provider` will be one of the `name`s you configured in the `oAuthProviders`   |
| signUp | `data`: `SignUpData` | `SignUpResponse`   | |
| requestPasswordReset | `email`: string | `void` | |

#### Handler Responses
##### `AuthResponse`
 ``` javascript
 {
  success: boolean,
  error?: {
    type: string, // ie email, username, password, general
    message: string
  }
 }
 ```
##### `SignUpResponse`
  ```javascript
  {
    success: boolean,
    errors?: [
      {
        type: string // eg name, email, password, general, etc
        message: string
      }
    ]
  }
  ```

### `theme`
Optionally, a theme can be provided to modify the `primaryColor` and `accentColor` of the UI. It takes the form:
``` javascript
{
  primaryColor: "#abc123", // Color of the buttons
  accentColor: "#abc123" // Color of the input accent and SSO provider containers
}
```