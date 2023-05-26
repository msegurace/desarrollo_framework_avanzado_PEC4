import { FormatDatePipe } from './format-date.pipe';

describe('DuplicatePile', () => {
  let pipe: FormatDatePipe;

  //declara la instancia antes de cada test
  beforeEach(() => {
    pipe = new FormatDatePipe();
  });

  //Test 1, que se cree el pipe correctamente
  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  //Test 2, con el argumento 1 devuelve el formato esperado
  it('Option 1 pipe format', () => {
    let opt: number = 1;
    let strDate: string = '2023-05-24';
    let date: Date = new Date(strDate);
    const result = pipe.transform(date, opt);
    expect(result).toBe('24052023');
  });

  //Test 3, con el argumento 2 devuelve el formato esperado
  it('Option 2 pipe format', () => {
    let opt: number = 2;
    let strDate: string = '2023-05-24';
    let date: Date = new Date(strDate);
    const result = pipe.transform(date, opt);
    expect(result).toBe('24 / 05 / 2023');
  });

  //Test 4, con el argumento 3 devuelve el formato esperado
  it('Option 3 pipe format', () => {
    let opt: number = 3;
    let strDate: string = '2023-05-24';
    let date: Date = new Date(strDate);
    const result = pipe.transform(date, opt);
    expect(result).toBe('24/05/2023');
  });

  //Test 5, con el argumento 4 devuelve el formato esperado
  it('Option 4 pipe format', () => {
    let opt: number = 4;
    let strDate: string = '2023-05-24';
    let date: Date = new Date(strDate);
    const result = pipe.transform(date, opt);
    expect(result).toBe('2023-05-24');
  });
});
