import moment from 'moment';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import beforeMaskedValueChange from './helpers/beforeMaskChanges';

const DOB_FORMAT = 'DD/MM/YYYY';
const YYYYMMDD = /^(18|19|20)\d\d[-/](0[1-9]|1[012])[-/](0[1-9]|[12][0-9]|3[01])$/i;
const formatChars = {
  1: '[0-3]',
  2: '[01]',
  3: '[12]',
  9: '[0-9]',
  a: '[A-Za-z]',
  '*': '[A-Za-z0-9]'
};

const CustomTextField = withStyles({
  // Override default CSS for multiline
  root: {
    '& .MuiOutlinedInput-multiline': { padding: 0 }
  }
})(TextField);

export const DateInput = props => {
  const { value } = props;
  const propDate =
    value && YYYYMMDD.test(value) && moment(value).format(DOB_FORMAT);
  const [date, setDate] = useState(propDate || '');

  useEffect(() => {
    if (YYYYMMDD.test(value)) {
      const formattedDate = moment(value).format(DOB_FORMAT);
      setDate(formattedDate);
    }
  }, [value]);

  function handleChange(event) {
    const { value } = event.target;
    setDate(value);
  }

  function handleSubmit(event) {
    // event.preventDefault();
    const submittedValues = { date };
    setTimeout(() => {
      alert(JSON.stringify(submittedValues, null, 2));
    }, 1000);
  }

  return (
    <form>
      <InputMask
        fullWidth
        beforeMaskedValueChange={beforeMaskedValueChange}
        formatChars={formatChars}
        margin="dense"
        mask="19/29/3999"
        maskChar={null}
        id="input-mask"
        name="input-mask"
        onChange={handleChange}
        placeholder="DD/MM/YYYY"
        value={date}
        variant="outlined"
      >
        {inputProps => <CustomTextField {...inputProps} type="tel" />}
      </InputMask>
      <Button onClick={handleSubmit} type="submit">
        Submit
      </Button>
    </form>
  );
};
