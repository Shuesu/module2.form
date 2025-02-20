import { useEffect, useState } from 'react';
import { validate } from './utils'
import styles from './field.module.css'

export const Field = ({
   value,
   setValue,
   setIsValid,
   validators,
   dependencies = {},
   forceValidation = () => false,
   ...props
}) => {
   const [error, setError] = useState(null);
   const [isDirty, setIsDirty] = useState();

   const validateField = (currenValue, shouldValidate) => {
      let error = null;
      let isValid = false;

      if (shouldValidate) {
         error = validate(currenValue, validators);
         isValid = error === null;
      }

      setError(error);
      setIsValid(isValid);
   };

   useEffect(() => {
      validateField(value, isDirty);
   }, [...Object.values(dependencies)]);

   const onChange = ({ target }) => {
      setValue(target.value);
      setIsDirty(true);

      const isForceValidated = forceValidation(target.value);

      validateField(target.value, isForceValidated);
   };

   const onBlur = () => validateField(value, isDirty);

   return (
      <div>
         <input
            onChange={onChange}
            onBlur={onBlur}
            {...props}
         />
         {error && <span className={styles.errorLabel}>{error}</span>}
      </div >
   );
}; 