import { forwardRef } from 'react';
import styles from './field.module.css';

export const Field = forwardRef(({ error, ...props }, ref) => {
   return (
      <div>
         <input ref={ref} {...props} />
         {error && <span className={styles.errorLabel}>{error}</span>}
      </div>
   );
});
