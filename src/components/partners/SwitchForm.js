import PropTypes from 'prop-types';
import { Switch } from '@headlessui/react';

export const SwitchForm = ({ switchEnabled, setSwitchEnabled, isTypeReport, typeReport, handleTypeReport }) => {
  return (
    <div className="flex items-center justify-between partner__form-switch">
      { isTypeReport &&
        <span className="pl-4 text-sm text-center form_type-report">{ typeReport.replace('_', ' ') }</span>
      }
      <Switch
        checked={switchEnabled}
        name={isTypeReport ? typeReport : 'isActive'}
        onChange={e => isTypeReport ? handleTypeReport(!!e ? 1 : 0, typeReport) : setSwitchEnabled(!!e ? 1 : 0) }
        className={`${switchEnabled ? 'form__partner-switch-active' : 'form__partner-switch-inactive'
          } relative inline-flex h-5 w-8 items-center rounded-full transition-colors duration-300 ${ isTypeReport ? 'my-2' : '' }`}
      >
        <span className="sr-only">Active Partner</span>
        <span
          className="inline-block transition-transform duration-300 transform bg-white rounded-full active__circle"
        />
      </Switch>
    </div>
  );
};

SwitchForm.propTypes = {
  switchEnabled: PropTypes.bool.isRequired,
  setSwitchEnabled: PropTypes.func,
  isTypeReport: PropTypes.bool,
  typeReport: PropTypes.string,
  handleTypeReport: PropTypes.func
};
