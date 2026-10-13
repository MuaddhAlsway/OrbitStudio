import { OptionGroup, TextArea, TextInput } from './Controls'
import {
  BUDGET_OPTIONS,
  COMMUNICATION_OPTIONS,
  SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
  URGENCY_OPTIONS,
  type BriefData,
  type BriefErrors,
  type BriefOption,
} from '../../data/brief'

interface StepProps {
  data: BriefData
  errors: BriefErrors
  update: (patch: Partial<BriefData>) => void
  toggleService: (id: string) => void
}

/* ------------------------------------------------------------------ */
/*  Step 1 — Services                                                  */
/* ------------------------------------------------------------------ */

export function ServicesStep({ data, errors, toggleService }: StepProps) {
  return (
    <OptionGroup
      legend="Which services do you need?"
      hint="Select all that apply."
      options={SERVICE_OPTIONS}
      selected={data.services}
      multiple
      columns={2}
      error={errors.services}
      onSelect={toggleService}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Step 2 — The project                                               */
/* ------------------------------------------------------------------ */

export function ProjectStep({ data, errors, update }: StepProps) {
  return (
    <div className="pb-grid">
      <TextInput
        id="projectName"
        label="Project name"
        value={data.projectName}
        onChange={(value) => update({ projectName: value })}
        error={errors.projectName}
        placeholder="e.g. New marketing website"
        maxLength={140}
      />
      <TextInput
        id="company"
        label="Business or company name"
        optional
        value={data.company}
        onChange={(value) => update({ company: value })}
        error={errors.company}
        maxLength={140}
      />
      <div className="pb-grid__full">
        <TextArea
          id="description"
          label="What are you building?"
          value={data.description}
          onChange={(value) => update({ description: value })}
          error={errors.description}
          hint="Describe the problem, the people who use it, and the outcome you want."
          placeholder="We are looking to…"
          rows={5}
          maxLength={4000}
        />
      </div>
      <TextInput
        id="existingWebsite"
        label="Existing website"
        optional
        value={data.existingWebsite}
        onChange={(value) => update({ existingWebsite: value })}
        error={errors.existingWebsite}
        type="url"
        placeholder="https://"
        autoComplete="url"
      />
      <TextInput
        id="launchDate"
        label="Ideal launch date"
        optional
        value={data.launchDate}
        onChange={(value) => update({ launchDate: value })}
        error={errors.launchDate}
        type="date"
      />
      <div className="pb-grid__full">
        <TextArea
          id="features"
          label="Required features"
          optional
          value={data.features}
          onChange={(value) => update({ features: value })}
          error={errors.features}
          hint="List the key functionality or integrations you have in mind."
          rows={4}
          maxLength={1500}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Step 3 — Budget & timeline                                         */
/* ------------------------------------------------------------------ */

export function ScopeStep({ data, errors, update }: StepProps) {
  return (
    <div className="pb-stack">
      <OptionGroup
        legend="Estimated budget"
        hint="A rough range is enough."
        options={BUDGET_OPTIONS}
        selected={data.budget ? [data.budget] : []}
        columns={2}
        error={errors.budget}
        onSelect={(id) => update({ budget: id })}
      />
      <OptionGroup
        legend="Desired timeline"
        options={TIMELINE_OPTIONS}
        selected={data.timeline ? [data.timeline] : []}
        columns={2}
        error={errors.timeline}
        onSelect={(id) => update({ timeline: id })}
      />
      <OptionGroup
        legend="Project urgency"
        options={URGENCY_OPTIONS}
        selected={data.urgency ? [data.urgency] : []}
        columns={2}
        error={errors.urgency}
        onSelect={(id) => update({ urgency: id })}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Step 4 — Contact                                                   */
/* ------------------------------------------------------------------ */

export function ContactStep({ data, errors, update }: StepProps) {
  return (
    <div className="pb-grid">
      <TextInput
        id="fullName"
        label="Full name"
        value={data.fullName}
        onChange={(value) => update({ fullName: value })}
        error={errors.fullName}
        autoComplete="name"
        maxLength={140}
      />
      <TextInput
        id="companyContact"
        label="Company name"
        optional
        value={data.companyContact}
        onChange={(value) => update({ companyContact: value })}
        error={errors.companyContact}
        autoComplete="organization"
        maxLength={140}
      />
      <TextInput
        id="email"
        label="Email address"
        value={data.email}
        onChange={(value) => update({ email: value })}
        error={errors.email}
        type="email"
        placeholder="you@company.com"
        autoComplete="email"
        inputMode="email"
      />
      <TextInput
        id="phone"
        label="Phone number"
        value={data.phone}
        onChange={(value) => update({ phone: value })}
        error={errors.phone}
        type="tel"
        placeholder="+966 5X XXX XXXX"
        autoComplete="tel"
        inputMode="tel"
      />
      <div className="pb-grid__full">
        <OptionGroup
          legend="Preferred contact method"
          options={COMMUNICATION_OPTIONS}
          selected={data.communication ? [data.communication] : []}
          columns={3}
          error={errors.communication}
          onSelect={(id) => update({ communication: id })}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Step 5 — Review                                                    */
/* ------------------------------------------------------------------ */

function ReviewSection({
  title,
  onEdit,
  rows,
}: {
  title: string
  onEdit: () => void
  rows: [string, string][]
}) {
  return (
    <section className="pb-review__section">
      <div className="pb-review__head">
        <h3 className="pb-review__title">{title}</h3>
        <button type="button" className="pb-review__edit" onClick={onEdit}>
          Edit
        </button>
      </div>
      <dl className="pb-review__list">
        {rows.map(([key, value]) => (
          <div className="pb-review__row" key={key}>
            <dt>{key}</dt>
            <dd>{value || '—'}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function ReviewStep({
  data,
  goTo,
}: {
  data: BriefData
  goTo: (index: number) => void
}) {
  const labelOfOption = (options: BriefOption[], id: string) =>
    options.find((option) => option.id === id)?.label || ''

  const services = data.services
    .map((id) => labelOfOption(SERVICE_OPTIONS, id))
    .filter(Boolean)
    .join(', ')

  return (
    <div className="pb-review">
      <ReviewSection
        onEdit={() => goTo(0)}
        title="Services"
        rows={[['Selected', services]]}
      />
      <ReviewSection
        onEdit={() => goTo(1)}
        title="The project"
        rows={[
          ['Project', data.projectName],
          ['Business', data.company],
          ['Description', data.description],
          ['Existing website', data.existingWebsite],
          ['Launch date', data.launchDate],
          ['Features', data.features],
        ]}
      />
      <ReviewSection
        onEdit={() => goTo(2)}
        title="Budget & timeline"
        rows={[
          ['Budget', labelOfOption(BUDGET_OPTIONS, data.budget)],
          ['Timeline', labelOfOption(TIMELINE_OPTIONS, data.timeline)],
          ['Urgency', labelOfOption(URGENCY_OPTIONS, data.urgency)],
        ]}
      />
      <ReviewSection
        onEdit={() => goTo(3)}
        title="Contact"
        rows={[
          ['Name', data.fullName],
          ['Email', data.email],
          ['Phone', data.phone],
          ['Company', data.companyContact],
          ['Preferred contact', labelOfOption(COMMUNICATION_OPTIONS, data.communication)],
        ]}
      />
    </div>
  )
}
