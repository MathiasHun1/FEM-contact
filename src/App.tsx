import type React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import successSVG from '/icon-success-check.svg';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [queryType, setQueryType] = useState<'general' | 'support' | ''>('');
  const [message, setMessage] = useState('');
  const [accept, setAccept] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [queryError, setQueryError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [acceptError, setAcceptError] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (checkEmpty(firstName)) {
      setFirstNameError(true);
    }
    if (checkEmpty(lastName)) {
      setLastNameError(true);
    }
    if (checkEmpty(email)) {
      setEmailError(true);
    }
    if (checkEmpty(message)) {
      setMessageError(true);
    }

    if (checkEmpty(queryType)) {
      setQueryError(true);
    }

    if (!validateEmail(email)) {
      setEmailError(true);
    }

    if (!accept) {
      setAcceptError(true);
    }

    if (
      !checkEmpty(firstName) &&
      !checkEmpty(lastName) &&
      !checkEmpty(email) &&
      !checkEmpty(message) &&
      !checkEmpty(queryType) &&
      validateEmail(email) &&
      accept
    ) {
      setSubmitted(true);
      clearAll();
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  }

  function checkEmpty(value: string) {
    if (value === '') return true;
  }

  function validateEmail(value: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return false;
    }
    return true;
  }

  function clearAll() {
    setFirstName('');
    setLastName('');
    setEmail('');
    setQueryType('');
    setMessage('');
    setAccept(false);
  }

  return (
    <>
      <div
        className={clsx('bg-grey-dark  p-6 rounded-xl absolute top-6', {
          'hidden ': !submitted,
        })}
      >
        <div className="text-white flex gap-2 items-center mb-2">
          <img src={successSVG} alt="" className="w-5" />
          <p className="text-lg font-bold">Message sent!</p>
        </div>
        <p className="text-green-light">
          Thanks for completing the form. We'll be in touch soon!
        </p>
      </div>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="w-11/12 max-w-[46rem] bg-white text-grey-dark p-6 rounded-2xl"
      >
        <h1 className="text-grey-dark text-3xl font-bold mb-8">Contact Us</h1>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 sm:flex-row">
            <InputField
              type="text"
              label="First Name"
              id="firstName"
              name="firstName"
              isError={firstNameError}
              value={firstName}
              onChange={(e) => {
                setFirstNameError(false);
                setFirstName(e.target.value);
              }}
            />
            <InputField
              type="text"
              label="Last Name"
              id="lastName"
              name="lastName"
              isError={lastNameError}
              value={lastName}
              onChange={(e) => {
                setLastNameError(false);
                setLastName(e.target.value);
              }}
            />
          </div>

          <InputField
            type="email"
            label="Email address"
            id="email"
            name="email"
            value={email}
            isError={emailError}
            onChange={(e) => {
              if (validateEmail(e.target.value)) {
                setEmailError(false);
              }
              setEmail(e.target.value);
            }}
          />

          <fieldset>
            <legend className="mb-2">Query type *</legend>

            <div className="flex flex-col gap-4 sm:flex-row">
              <label
                htmlFor="general"
                className="flex items-center gap-3 px-6 py-3 outline outline-grey-light rounded-lg flex-1 focus-within:outline-green-dark focus-within:bg-green-light transition-colors cursor-pointer hover:outline-green-dark has-checked:bg-green-light"
              >
                <input
                  type="radio"
                  name="queryType"
                  id="general"
                  value="general"
                  checked={queryType === 'general'}
                  onChange={() => {
                    setQueryError(false);
                    setQueryType('general');
                  }}
                  className="appearance-none relative w-5 h-5 border-2 border-grey-light focus:outline-none checked:border-green-dark rounded-full after:absolute after:content-[''] after:inset-[3px] after:bg-green-dark after:rounded-full after:scale-0 after:transition-transform after:duration-75  checked:after:scale-100 checked:after:transition-transform cursor-pointer"
                />
                General Enquery
              </label>
              <label
                htmlFor="support"
                className="flex items-center gap-3 px-6 py-3 outline outline-grey-light rounded-lg flex-1 focus-within:outline-green-dark focus-within:bg-green-light transition-colors cursor-pointer hover:outline-green-dark has-checked:bg-green-light"
              >
                <input
                  type="radio"
                  name="queryType"
                  id="support"
                  value="support"
                  checked={queryType === 'support'}
                  onChange={() => {
                    setQueryError(false);
                    setQueryType('support');
                  }}
                  className="peer appearance-none relative w-5 h-5 border-2 border-grey-light focus:outline-none checked:border-green-dark  rounded-full after:absolute after:content-[''] after:inset-[3px] after:bg-green-dark after:rounded-full after:scale-0 after:transition-transform after:duration-75 checked:after:scale-100 checked:after:transition-transform cursor-pointer"
                />
                Support Request
              </label>
            </div>
            <p className={clsx('text-red mt-2', { 'hidden ': !queryError })}>
              Please select a query type
            </p>
          </fieldset>

          <div className="flex flex-col gap-4">
            <label htmlFor="message">Message *</label>
            <textarea
              name="message"
              id="message"
              value={message}
              onChange={(e) => {
                setMessageError(false);
                setMessage(e.target.value);
              }}
              className={clsx(
                'outline w-full outline-grey-light rounded-lg aspect-square px-6 py-3 sm:aspect-[revert] sm:h-30',
                {
                  'outline-red!': messageError,
                }
              )}
            ></textarea>
            <p className={clsx('text-red', { 'hidden ': !messageError })}>
              This field is required
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-10">
          <input
            type="checkbox"
            id="aggree"
            name="aggree"
            checked={accept}
            onChange={() => {
              setAcceptError(false);
              setAccept(!accept);
            }}
            className="appearance-none shrink-0 w-5 h-5 border-1 border-grey-light checked:bg-[url(/icon-checkbox-check.svg)] cursor-pointer hover:border-green-dark"
          />
          <label htmlFor="aggree">
            I consent to being contacted by the team *
          </label>
        </div>
        <p className={clsx('text-red mt-2', { 'hidden ': !acceptError })}>
          To submit this form, please consent to being contacted
        </p>

        <button className="w-full py-3 bg-green-dark rounded-lg text-white text-lg font-bold mt-10 hover:bg-grey-dark cursor-pointer transition-all">
          Submit
        </button>
      </form>
    </>
  );
}

type Props = {
  label: string;
  id: string;
  name: string;
  type: string;
  value?: string;
  isError: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({
  label,
  id,
  name,
  type,
  value,
  isError,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label htmlFor={id}>{label} *</label>
      <input
        type={type}
        id={id}
        name={name}
        onChange={onChange}
        className={clsx(
          'outline outline-grey-light rounded-lg py-3 px-6 hover:outline-green-dark hover:cursor-pointer focus:outline-green-dark',
          {
            'outline-red!': isError,
          }
        )}
        value={value}
      />
      <p
        className={clsx('text-red', {
          'hidden ': !isError,
        })}
      >
        {type === 'text' && 'This field is required'}
        {type === 'email' && 'Please enter a valid email address'}
      </p>
    </div>
  );
}

export default App;
