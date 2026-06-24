import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { Send, UploadCloud } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

const services = [
  'Custom Software Development',
  'Website Development',
  'Mobile App Development',
  'PC Diagnostics & Troubleshooting',
  'Server/Backend Development',
  'Technical Consultation',
  'Other',
];

const budgets = ['Under ₹5,000', '₹5,000-₹20,000', '₹20,000-₹50,000', 'Above ₹50,000', 'Not Sure'];
const contactMethods = ['Email', 'Phone', 'WhatsApp'];
const deviceTypes = ['Desktop', 'Laptop'];
const bootOptions = ['Yes', 'No', 'Sometimes'];

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  serviceRequired: 'Custom Software Development',
  projectTitle: '',
  requirementDescription: '',
  problemToSolve: '',
  users: '',
  existingSystem: '',
  featuresRequired: '',
  referenceLinks: '',
  expectedCompletionDate: '',
  estimatedBudgetRange: 'Not Sure',
  preferredContactMethod: 'WhatsApp',
  bestTimeToContact: '',
  additionalNotes: '',
  consent: false,
  deviceType: '',
  brandModel: '',
  operatingSystem: '',
  processor: '',
  ram: '',
  issueDescription: '',
  issueStartedAt: '',
  errorMessages: '',
  canBoot: '',
};

type FormState = typeof initialForm;

export function RequestPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const showPcFields = form.serviceRequired === 'PC Diagnostics & Troubleshooting';

  const canSubmit = useMemo(() => {
    return form.fullName && form.email && form.phone && form.projectTitle && form.requirementDescription && form.consent;
  }, [form]);

  function updateField(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = event.target;
    const checked = type === 'checkbox' ? (event.target as HTMLInputElement).checked : undefined;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  }

  function updateFiles(event: ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(event.target.files ?? []));
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setMessage('');

    const payload = new FormData();
    payload.append('request', new Blob([JSON.stringify(form)], { type: 'application/json' }));
    files.forEach((file) => payload.append('files', file));

    try {
      const response = await fetch(`${API_BASE_URL}/api/service-requests`, {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
      setMessage('Your request has been sent. We will contact you after reviewing the details.');
      setForm(initialForm);
      setFiles([]);
      event.currentTarget.reset();
    } catch {
      setStatus('error');
      setMessage('We could not send the request right now. Please try again or contact us directly.');
    }
  }

  return (
    <section className="page-wrap request-page">
      <div className="page-heading">
        <span className="section-kicker">Customer request form</span>
        <h1>Share your software or IT need with enough detail for a useful reply.</h1>
        <p>
          Add the requirement, budget, timeline, files and contact preference. PC diagnostics shows extra fields
          when selected.
        </p>
      </div>

      <form className="request-form" onSubmit={submitRequest}>
        <fieldset>
          <legend>Basic Information</legend>
          <div className="form-grid">
            <label>
              Full Name
              <input name="fullName" value={form.fullName} onChange={updateField} required />
            </label>
            <label>
              Email Address
              <input type="email" name="email" value={form.email} onChange={updateField} required />
            </label>
            <label>
              Phone Number / WhatsApp
              <input name="phone" value={form.phone} onChange={updateField} required />
            </label>
            <label>
              Company Name (Optional)
              <input name="companyName" value={form.companyName} onChange={updateField} />
            </label>
            <label className="wide">
              Service Required
              <select name="serviceRequired" value={form.serviceRequired} onChange={updateField}>
                {services.map((service) => (
                  <option key={service}>{service}</option>
                ))}
              </select>
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Project Details</legend>
          <div className="form-grid">
            <label>
              Project Title
              <input name="projectTitle" value={form.projectTitle} onChange={updateField} required />
            </label>
            <label>
              Who will use this solution?
              <input name="users" value={form.users} onChange={updateField} placeholder="Customers, employees, students..." />
            </label>
            <label className="wide">
              Describe your requirement
              <textarea name="requirementDescription" value={form.requirementDescription} onChange={updateField} required />
            </label>
            <label className="wide">
              What problem are you trying to solve?
              <textarea name="problemToSolve" value={form.problemToSolve} onChange={updateField} />
            </label>
            <label className="wide">
              Any existing system/software currently in use?
              <textarea name="existingSystem" value={form.existingSystem} onChange={updateField} />
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Features Required</legend>
          <div className="form-grid">
            <label className="wide">
              List the features you need
              <textarea name="featuresRequired" value={form.featuresRequired} onChange={updateField} />
            </label>
            <label className="wide">
              Any reference websites/apps? (Optional)
              <textarea name="referenceLinks" value={form.referenceLinks} onChange={updateField} />
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Timeline & Budget</legend>
          <div className="form-grid">
            <label>
              Expected Completion Date
              <input type="date" name="expectedCompletionDate" value={form.expectedCompletionDate} onChange={updateField} />
            </label>
            <label>
              Estimated Budget Range
              <select name="estimatedBudgetRange" value={form.estimatedBudgetRange} onChange={updateField}>
                {budgets.map((budget) => (
                  <option key={budget}>{budget}</option>
                ))}
              </select>
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Attachments</legend>
          <label className="file-drop">
            <UploadCloud size={26} />
            <span>Upload images, documents, screenshots or requirement files</span>
            <input type="file" multiple onChange={updateFiles} />
          </label>
          {files.length > 0 && <p className="file-count">{files.length} file(s) selected</p>}
        </fieldset>

        {showPcFields && (
          <fieldset className="pc-fields">
            <legend>PC Diagnostics & Troubleshooting</legend>
            <div className="form-grid">
              <label>
                Desktop or Laptop
                <select name="deviceType" value={form.deviceType} onChange={updateField}>
                  <option value="">Select device type</option>
                  {deviceTypes.map((deviceType) => (
                    <option key={deviceType}>{deviceType}</option>
                  ))}
                </select>
              </label>
              <label>
                Brand & Model
                <input name="brandModel" value={form.brandModel} onChange={updateField} />
              </label>
              <label>
                Operating System
                <input name="operatingSystem" value={form.operatingSystem} onChange={updateField} />
              </label>
              <label>
                Processor (if known)
                <input name="processor" value={form.processor} onChange={updateField} />
              </label>
              <label>
                RAM (if known)
                <input name="ram" value={form.ram} onChange={updateField} />
              </label>
              <label>
                Can the device still boot?
                <select name="canBoot" value={form.canBoot} onChange={updateField}>
                  <option value="">Select boot status</option>
                  {bootOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="wide">
                Describe the issue
                <textarea name="issueDescription" value={form.issueDescription} onChange={updateField} />
              </label>
              <label>
                When did the issue start?
                <input name="issueStartedAt" value={form.issueStartedAt} onChange={updateField} />
              </label>
              <label>
                Any error messages?
                <input name="errorMessages" value={form.errorMessages} onChange={updateField} />
              </label>
            </div>
          </fieldset>
        )}

        <fieldset>
          <legend>Additional Information</legend>
          <div className="form-grid">
            <label>
              Preferred Contact Method
              <select name="preferredContactMethod" value={form.preferredContactMethod} onChange={updateField}>
                {contactMethods.map((method) => (
                  <option key={method}>{method}</option>
                ))}
              </select>
            </label>
            <label>
              Best Time to Contact
              <input name="bestTimeToContact" value={form.bestTimeToContact} onChange={updateField} />
            </label>
            <label className="wide">
              Additional Notes
              <textarea name="additionalNotes" value={form.additionalNotes} onChange={updateField} />
            </label>
          </div>
        </fieldset>

        <label className="consent-line">
          <input type="checkbox" name="consent" checked={form.consent} onChange={updateField} required />
          <span>
            I understand that submitting this form is a request for quotation/service and does not guarantee
            acceptance of the project.
          </span>
        </label>

        <div className="submit-row">
          <button className="primary-action" type="submit" disabled={!canSubmit || status === 'sending'}>
            <Send size={18} />
            {status === 'sending' ? 'Sending...' : 'Send Request'}
          </button>
          {message && <p className={status === 'success' ? 'success-message' : 'error-message'}>{message}</p>}
        </div>
      </form>
    </section>
  );
}

