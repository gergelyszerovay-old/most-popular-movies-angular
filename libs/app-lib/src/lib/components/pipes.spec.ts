import {GetYearFromISODatePipe, NumberToFixedPipe} from "./pipes";

describe('Pipe tests', () => {
  it('GetYearFromISODatePipe should work', () => {
    expect(new GetYearFromISODatePipe().transform('2020-03-23')).toEqual('2020');
    expect(new GetYearFromISODatePipe().transform('1982-12-11')).toEqual('1982');
  });

  it('GetYearFromISODatePipe NumberToFixedPipe work', () => {
    expect(new NumberToFixedPipe().transform(32.324, 1)).toEqual('32.3');
    expect(new NumberToFixedPipe().transform(1.48, 1)).toEqual('1.5');
  });
});
