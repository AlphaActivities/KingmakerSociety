export interface ValidationError {
  [key: string]: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phone.length >= 10 && phoneRegex.test(phone);
};

export const validateRequired = (value: string | number): boolean => {
  if (typeof value === 'number') return true;
  return value.trim().length > 0;
};

export const validateAge = (age: string): boolean => {
  const ageNum = parseInt(age);
  return !isNaN(ageNum) && ageNum >= 18 && ageNum <= 100;
};

export const validateLeadForm = (formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: string;
  timezone: string;
  occupation: string;
  struggle: string;
}): ValidationError => {
  const errors: ValidationError = {};

  if (!validateRequired(formData.firstName)) {
    errors.firstName = 'First name is required';
  }

  if (!validateRequired(formData.lastName)) {
    errors.lastName = 'Last name is required';
  }

  if (!validateRequired(formData.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!validateRequired(formData.phone)) {
    errors.phone = 'Phone number is required';
  } else if (!validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!validateRequired(formData.age)) {
    errors.age = 'Age is required';
  } else if (!validateAge(formData.age)) {
    errors.age = 'Please enter a valid age (18-100)';
  }

  if (!validateRequired(formData.timezone)) {
    errors.timezone = 'Time zone is required';
  }

  if (!validateRequired(formData.occupation)) {
    errors.occupation = 'Occupation is required';
  }

  if (!validateRequired(formData.struggle)) {
    errors.struggle = 'Please select your biggest struggle';
  }

  return errors;
};
