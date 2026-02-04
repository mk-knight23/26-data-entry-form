import { useState } from 'react';
import { Check, User, Mail, Briefcase, Phone, MapPin, RotateCcw, Send } from 'lucide-react';
import { useUserStore } from '../stores/userStore';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  phone: string;
  location: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  employeeId?: string;
  phone?: string;
  location?: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  employeeId: '',
  phone: '',
  location: '',
};

export default function Home() {
  const userStore = useUserStore();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) return 'First name is required';
        if (value.length < 2) return 'Must be at least 2 characters';
        if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Letters only';
        return undefined;

      case 'lastName':
        if (!value.trim()) return 'Last name is required';
        if (value.length < 2) return 'Must be at least 2 characters';
        if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Letters only';
        return undefined;

      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return undefined;

      case 'employeeId':
        if (value && !/^EMP-\d{3}$/.test(value)) return 'Format: EMP-XXX';
        return undefined;

      case 'phone':
        if (value && !/^\d{10,}$/.test(value.replace(/\D/g, ''))) return 'At least 10 digits required';
        return undefined;

      case 'location':
        if (value && value.length < 3) return 'At least 3 characters';
        return undefined;

      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      employeeId: true,
      phone: true,
      location: true,
    });

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      userStore.updateProfile({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
      });
      userStore.incrementProjects();
      setIsSubmitted(true);
    }
  };

  const handleClear = () => {
    setFormData(initialFormData);
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Employee Registration</h1>
          <p className="text-slate-500">Complete the form below to register a new employee</p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Registration Successful!</h2>
          <p className="text-slate-600 mb-8">
            Employee <strong>{formData.firstName} {formData.lastName}</strong> has been registered successfully.
          </p>
          <button
            onClick={handleClear}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Register Another Employee
          </button>
        </div>
      </div>
    );
  }

  const inputClasses = (fieldName: keyof FormData) => `
    w-full px-4 py-3 bg-white border-2 rounded-xl text-slate-900 placeholder-slate-400
    transition-all duration-200 outline-none
    ${errors[fieldName] && touched[fieldName]
      ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
      : 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
    }
  `;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Employee Registration</h1>
        <p className="text-slate-500">Complete the form below to register a new employee</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label-text">
              <span className="flex items-center gap-2">
                <User className="w-3 h-3" />
                First Name *
              </span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="John"
              className={inputClasses('firstName')}
              aria-invalid={!!errors.firstName && touched.firstName}
              aria-describedby={errors.firstName && touched.firstName ? 'firstName-error' : undefined}
            />
            {errors.firstName && touched.firstName && (
              <p id="firstName-error" className="mt-2 text-sm text-red-500 font-medium">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label className="label-text">
              <span className="flex items-center gap-2">
                <User className="w-3 h-3" />
                Last Name *
              </span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Doe"
              className={inputClasses('lastName')}
              aria-invalid={!!errors.lastName && touched.lastName}
              aria-describedby={errors.lastName && touched.lastName ? 'lastName-error' : undefined}
            />
            {errors.lastName && touched.lastName && (
              <p id="lastName-error" className="mt-2 text-sm text-red-500 font-medium">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="label-text">
            <span className="flex items-center gap-2">
              <Mail className="w-3 h-3" />
              Email Address *
            </span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="john.doe@company.com"
            className={inputClasses('email')}
            aria-invalid={!!errors.email && touched.email}
            aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
          />
          {errors.email && touched.email && (
            <p id="email-error" className="mt-2 text-sm text-red-500 font-medium">
              {errors.email}
            </p>
          )}
        </div>

        {/* Employee ID */}
        <div>
          <label className="label-text">
            <span className="flex items-center gap-2">
              <Briefcase className="w-3 h-3" />
              Employee ID <span className="text-slate-300 font-normal">(Optional)</span>
            </span>
          </label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="EMP-001"
            className={inputClasses('employeeId')}
            aria-invalid={!!errors.employeeId && touched.employeeId}
            aria-describedby={errors.employeeId && touched.employeeId ? 'employeeId-error' : undefined}
          />
          {errors.employeeId && touched.employeeId && (
            <p id="employeeId-error" className="mt-2 text-sm text-red-500 font-medium">
              {errors.employeeId}
            </p>
          )}
          <p className="mt-2 text-xs text-slate-400">Format: EMP-XXX (e.g., EMP-001)</p>
        </div>

        {/* Phone */}
        <div>
          <label className="label-text">
            <span className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              Phone Number <span className="text-slate-300 font-normal">(Optional)</span>
            </span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+1 (555) 123-4567"
            className={inputClasses('phone')}
            aria-invalid={!!errors.phone && touched.phone}
            aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
          />
          {errors.phone && touched.phone && (
            <p id="phone-error" className="mt-2 text-sm text-red-500 font-medium">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="label-text">
            <span className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              Location <span className="text-slate-300 font-normal">(Optional)</span>
            </span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="New York, NY"
            className={inputClasses('location')}
            aria-invalid={!!errors.location && touched.location}
            aria-describedby={errors.location && touched.location ? 'location-error' : undefined}
          />
          {errors.location && touched.location && (
            <p id="location-error" className="mt-2 text-sm text-red-500 font-medium">
              {errors.location}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-200 shadow-lg shadow-indigo-200"
          >
            <Send className="w-5 h-5" />
            Submit Registration
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
          >
            <RotateCcw className="w-5 h-5" />
            Clear All
          </button>
        </div>
      </form>
    </div>
  );
}
