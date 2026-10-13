import type { ReactNode } from 'react'
import type { BriefOption } from '../../data/brief'

/* ------------------------------------------------------------------ */
/*  Field wrapper                                                      */
/* ------------------------------------------------------------------ */

interface FieldProps {
  id: string
  label: string
  optional?: boolean
  hint?: string
  error?: string
  children: ReactNode
}

export function Field({ id, label, optional, hint, error, children }: FieldProps) {
  return (
    <div className={`pb-field${error ? ' has-error' : ''}`}>
      <label className="pb-field__label" htmlFor={id}>
        {label}
        {optional && <span className="pb-field__opt">Optional</span>}
      </label>
      {hint && (
        <p className="pb-field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p className="pb-field__error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

function describedBy(id: string, hint?: string, error?: string) {
  const ids: string[] = []
  if (hint) ids.push(`${id}-hint`)
  if (error) ids.push(`${id}-error`)
  return ids.length ? ids.join(' ') : undefined
}

/* ------------------------------------------------------------------ */
/*  Text input                                                         */
/* ------------------------------------------------------------------ */

interface TextInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  optional?: boolean
  hint?: string
  error?: string
  type?: 'text' | 'email' | 'tel' | 'url' | 'date'
  placeholder?: string
  autoComplete?: string
  inputMode?: 'text' | 'email' | 'tel' | 'url' | 'numeric'
  maxLength?: number
}

export function TextInput({
  id,
  label,
  value,
  onChange,
  optional,
  hint,
  error,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
  maxLength,
}: TextInputProps) {
  return (
    <Field id={id} label={label} optional={optional} hint={hint} error={error}>
      <input
        id={id}
        className="pb-input"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
      />
    </Field>
  )
}

/* ------------------------------------------------------------------ */
/*  Text area                                                          */
/* ------------------------------------------------------------------ */

interface TextAreaProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  optional?: boolean
  hint?: string
  error?: string
  placeholder?: string
  rows?: number
  maxLength?: number
}

export function TextArea({
  id,
  label,
  value,
  onChange,
  optional,
  hint,
  error,
  placeholder,
  rows = 5,
  maxLength,
}: TextAreaProps) {
  return (
    <Field id={id} label={label} optional={optional} hint={hint} error={error}>
      <textarea
        id={id}
        className="pb-textarea"
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
      />
    </Field>
  )
}

/* ------------------------------------------------------------------ */
/*  Option group (radio / checkbox cards)                              */
/* ------------------------------------------------------------------ */

interface OptionGroupProps {
  legend: string
  hint?: string
  error?: string
  options: BriefOption[]
  selected: string[]
  multiple?: boolean
  columns?: 1 | 2 | 3
  onSelect: (id: string) => void
}

export function OptionGroup({
  legend,
  hint,
  error,
  options,
  selected,
  multiple = false,
  columns = 2,
  onSelect,
}: OptionGroupProps) {
  const groupId = `pb-${legend.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return (
    <fieldset className={`pb-group pb-group--c${columns}${error ? ' has-error' : ''}`}>
      <legend className="pb-group__legend">
        {legend}
        {multiple && <span className="pb-group__hint">{hint || 'Select all that apply'}</span>}
      </legend>
      {!multiple && hint && <p className="pb-group__hint">{hint}</p>}
      <div className="pb-group__options" role={multiple ? 'group' : 'radiogroup'}>
        {options.map((option) => {
          const isSelected = selected.includes(option.id)
          return (
            <label
              key={option.id}
              className={`pb-option${isSelected ? ' is-selected' : ''}${
                option.description ? ' pb-option--rich' : ''
              }`}
            >
              <input
                className="pb-option__input"
                type={multiple ? 'checkbox' : 'radio'}
                name={multiple ? `${groupId}[]` : groupId}
                value={option.id}
                checked={isSelected}
                onChange={() => onSelect(option.id)}
              />
              <span className="pb-option__mark" aria-hidden="true" />
              <span className="pb-option__body">
                <span className="pb-option__label">{option.label}</span>
                {option.description && (
                  <span className="pb-option__desc">{option.description}</span>
                )}
              </span>
            </label>
          )
        })}
      </div>
      {error && (
        <p className="pb-field__error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}
