//validação do login e signin

//validação do nome:
export function validateName(e, setNameError) {
  const input = e.target;

  if (input.validity.tooShort) {
    setNameError("O nome deve ter pelo menos 2 caracteres");
  } else {
    setNameError("");
  }
}

//validação do telefone:
export function validatePhone(e, setPhoneError) {
  const valor = e.target.value;

  if (!/^[\d\s()+-]*$/.test(valor)) {
    setPhoneError("Digite um telefone válido");
  } else if (valor.length > 0 && valor.length < 10) {
    setPhoneError("O telefone deve ter pelo menos 10 caracteres");
  } else {
    setPhoneError("");
  }
}

//validação da cidade:
export function validateCity(e, setCityError) {
  const input = e.target;

  if (input.validity.tooShort) {
    setCityError("Digite uma cidade válida");
  } else {
    setCityError("");
  }
}

//validação do endereço
export function validateAdress(e, setAdressError) {
  const input = e.target;

  if (input.validity.tooShort) {
    setAdressError("Digite um endereço válido");
  } else {
    setAdressError("");
  }
}

//validação do email
export function validateEmail(e, setEmailError) {
  const valor = e.target.value;

  if (valor.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
    setEmailError("Digite um e-mail válido");
  } else {
    setEmailError("");
  }
}

//validação da senha
export function validatePassword(e, setPasswordError) {
  const input = e.target;

  if (input.validity.tooShort) {
    setPasswordError("A senha deve ter pelo menos 8 caracteres");
  } else {
    setPasswordError("");
  }
}

//validação do agendamento:

//validação nome do pet
export function validatePetName(e, setPetNameError) {
  const value = e.target.value;

  if (value.length < 2) {
    setPetNameError("Digite o nome");
  } else {
    setPetNameError("");
  }
}

//validação raça
export function validateBreed(e, setBreedError) {
  const input = e.target;

  if (input.validity.tooShort) {
    setBreedError("Digite a raça");
  } else {
    setBreedError("");
  }
}

//validação nome do tutor
export function validateTutorName(e, setTutorNameError) {
  const input = e.target;

  if (input.validity.tooShort) {
    setTutorNameError("Digite o nome");
  } else {
    setTutorNameError("");
  }
}

//validação find a home

//validação espécie
export function validateSpecies(e, setSpeciesError) {
  const value = e.target.value;

  if (value.length < 2) {
    setSpeciesError("Digite uma espécie válida");
  } else {
    setSpeciesError("");
  }
}

//validação gênero
export function validateGender(e, setGenderError) {
  const value = e.target.value;

  if (value.length < 5) {
    setGenderError("Digite um gênero");
  } else {
    setGenderError("");
  }
}

//validação idade
export function validateAge(e, setAgeError) {
  const value = e.target.value;
  if (value === "") {
    setAgeError("Digite a idade");
  } else if (Number(value) < 0 || Number(value) > 200) {
    setAgeError("Digite uma idade válida");
  } else {
    setAgeError("");
  }
}

//validação peso
export function validateWeight(e, setWeightError) {
  const value = e.target.value;

  if (value === "") {
    setWeightError("Digite o peso");
  } else if (Number(value) < 0 || Number(value) > 500) {
    setWeightError("Digite um peso válido");
  } else {
    setWeightError("");
  }
}

//validação estado
export function validateState(e, setStateError) {
  const value = e.target.value;

  if (value.length !== 2) {
    setStateError("Digite uma UF com 2 letras");
  } else {
    setStateError("");
  }
}

//validação foto de perfil
export function validateProfilePicture(e, setProfilePictureError) {
  const input = e.target;

  if (input.validity.typeMismatch) {
    setProfilePictureError("Digite uma URL válida");
  } else {
    setProfilePictureError("");
  }
}

//validação necessidades básicas
export function validateBasicNeeds(e, setBasicNeedsError) {
  const value = e.target.value;

  if (value.length < 2) {
    setBasicNeedsError("Digite a necessidade básica");
  } else {
    setBasicNeedsError("");
  }
}

//validação necessidades especiais
export function validateSpecialNeeds(e, setSpecialNeedsError) {
  const value = e.target.value;

  if (value.length < 2) {
    setSpecialNeedsError("Digite a necessidade especial");
  } else {
    setSpecialNeedsError("");
  }
}

//validação microchip
export function validateMicrochip(e, setMicrochipError) {
  const value = e.target.value.trim();

  if (value.length < 3) {
    setMicrochipError("Digite um microchip válido");
  } else {
    setMicrochipError("");
  }
}

//validação do resgate
export function validateRescue(e, setRescueError) {
  const value = e.target.value;

  if (!value) {
    setRescueError("Selecione uma data");
    return;
  }

  const selectedDate = new Date(value);
  const today = new Date();

  if (selectedDate > today) {
    setRescueError("A data de resgate não pode ser futura");
  } else {
    setRescueError("");
  }
}

//validação adestramento
export function validateTraining(e, setTrainingError) {
  const input = e.target;

  if (input.validity.tooShort) {
    setTrainingError("Digite o nível de treinamento");
  } else {
    setTrainingError("");
  }
}

//validação motivo do resgate
export function validateRescueReason(e, setRescueReasonError) {
  const input = e.target;

  if (input.validity.tooShort) {
    setRescueReasonError("Digite o motivo do resgate");
  } else {
    setRescueReasonError("");
  }
}
//validação da vacina
export function validateVaccine(e, setVaccineError) {
  const input = e.target;

  if (input.validity.tooShort) {
    setVaccineError("Digite o nome da vacina:");
  } else {
    setVaccineError("");
  }
}

//validação data de aplicação
export function validateApplicationDate(e, setApplicationDateError) {
  const value = e.target.value;

  if (!value) {
    setApplicationDateError("Selecione uma data");
    return;
  }

  const applicationDate = new Date(value);
  const today = new Date();

  if (applicationDate > today) {
    setApplicationDateError("A data não pode ser futura");
  } else {
    setApplicationDateError("");
  }
}

//validação biografia
export function validateBio(e, setBioError) {
  const input = e.target;

  if (input.validity.tooShort) {
    setBioError("Digite a biografia");
  } else {
    setBioError("");
  }
}
