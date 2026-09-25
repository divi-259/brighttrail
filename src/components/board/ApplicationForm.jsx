import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Select from "../ui/Select";
import TagInput from "../ui/TagInput";
import Button from "../ui/Button";
import fieldStyles from "../ui/Field.module.css";
import { STATUSES, SOURCES } from "../../lib/statuses";
import { blankApplication } from "../../lib/storage";

export default function ApplicationForm({ initialValue, onSave, onClose, onDelete }) {
  const [values, setValues] = useState(() => ({ ...blankApplication(), ...initialValue }));
  const isEditing = Boolean(initialValue);

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.company.trim() || !values.title.trim()) return;
    onSave(values);
  };

  return (
    <Modal
      title={isEditing ? "Edit application" : "Add application"}
      onClose={onClose}
      width="600px"
      footer={
        <>
          {isEditing && (
            <Button variant="danger" type="button" onClick={onDelete} style={{ marginRight: "auto" }}>
              Delete
            </Button>
          )}
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="application-form">
            {isEditing ? "Save changes" : "Add application"}
          </Button>
        </>
      }
    >
      <form id="application-form" onSubmit={handleSubmit}>
        <div className={fieldStyles.row}>
          <Input
            label="Company"
            value={values.company}
            onChange={set("company")}
            placeholder="e.g. Apple"
            required
            autoFocus
          />
          <Input
            label="Job title"
            value={values.title}
            onChange={set("title")}
            placeholder="e.g. Software Engineer"
            required
          />
        </div>

        <div className={fieldStyles.row}>
          <Select label="Status" value={values.status} onChange={set("status")}>
            {STATUSES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </Select>
          <Input label="Application date" type="date" value={values.appliedDate} onChange={set("appliedDate")} />
        </div>

        <div className={fieldStyles.row}>
          <Input label="Location" value={values.location} onChange={set("location")} placeholder="Remote, NYC…" />
          <Input label="Salary range" value={values.salaryRange} onChange={set("salaryRange")} placeholder="$120k–$150k" />
        </div>

        <Input label="Job posting URL" value={values.jobUrl} onChange={set("jobUrl")} placeholder="https://…" />

        <div className={fieldStyles.row}>
          <Input label="Contact name" value={values.contactName} onChange={set("contactName")} placeholder="Recruiter or referral" />
          <Input label="Contact email / LinkedIn" value={values.contactInfo} onChange={set("contactInfo")} />
        </div>

        <Select label="Source" value={values.source} onChange={set("source")}>
          <option value="">Select a source…</option>
          {SOURCES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>

        <TagInput label="Tags" value={values.tags} onChange={(tags) => setValues((v) => ({ ...v, tags }))} />

        <Input label="Notes" as="textarea" rows={3} value={values.notes} onChange={set("notes")} />
      </form>
    </Modal>
  );
}
