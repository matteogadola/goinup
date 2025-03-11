import CodiceFiscale from "codice-fiscale-js";

export const isTinValid = (tin: string) => {
  try {
    const cf = new CodiceFiscale(tin);

    if (!cf.isValid()) {
      return `Codice fiscale ${tin} non valido`;
    }
    
    return null
  } catch (e: any) {
    return `Codice fiscale ${tin} non valido`;
  }
};

export const verifyTin = (tin: string, firstName: string, lastName: string) => {
  const cf = new CodiceFiscale(tin);

  if (!cf.isValid()) {
    throw new Error(`Codice fiscale ${tin} non valido`);
  }

  const checkTin = new CodiceFiscale({
    name: firstName,
    surname: lastName,
    gender: cf.gender,
    day: cf.day,
    month: cf.month,
    year: cf.year,
    birthplace: cf.birthplace.nome,
    birthplaceProvincia: '',
  });

  if (checkTin.toString() !== cf.cf) {
    throw new Error(`Corrispondenza codice fiscale non valida`);
  }

  return cf;
};