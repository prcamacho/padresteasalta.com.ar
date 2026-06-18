import Link from "next/link";

import {
  formatAdminDateTimeLocal,
  type AdminActivity
} from "@/lib/admin/activities";

type ActivityFormProps = {
  action: (formData: FormData) => Promise<void>;
  activity?: AdminActivity;
  cancelHref?: string;
  submitLabel: string;
};

const statusOptions = [
  { label: "Borrador", value: "draft" },
  { label: "Publicada", value: "published" },
  { label: "Archivada", value: "archived" }
];

const modalityOptions = [
  { label: "A confirmar", value: "to_confirm" },
  { label: "Presencial", value: "in_person" },
  { label: "Virtual", value: "online" },
  { label: "Hibrida", value: "hybrid" }
];

export function ActivityForm({
  action,
  activity,
  cancelHref,
  submitLabel
}: ActivityFormProps) {
  return (
    <form className="admin-form admin-form-wide" action={action}>
      <div className="admin-form-grid">
        <label className="admin-field-full">
          Titulo
          <input
            maxLength={120}
            name="title"
            placeholder="Encuentro de familias"
            required
            type="text"
            defaultValue={activity?.title ?? ""}
          />
        </label>

        <label className="admin-field-full">
          Resumen
          <textarea
            maxLength={260}
            name="summary"
            placeholder="Una frase corta para contar de que se trata."
            required
            rows={3}
            defaultValue={activity?.summary ?? ""}
          />
        </label>

        <label className="admin-field-full">
          Descripcion
          <textarea
            name="description"
            placeholder="Aca podes sumar horarios, detalles o lo que haga falta."
            rows={6}
            defaultValue={activity?.description ?? ""}
          />
        </label>

        <label>
          Estado
          <select defaultValue={activity?.status ?? "draft"} name="status">
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Modalidad
          <select defaultValue={activity?.modality ?? "to_confirm"} name="modality">
            {modalityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Inicio
          <input
            name="starts_at"
            type="datetime-local"
            defaultValue={formatAdminDateTimeLocal(activity?.starts_at ?? null)}
          />
        </label>

        <label>
          Fin
          <input
            name="ends_at"
            type="datetime-local"
            defaultValue={formatAdminDateTimeLocal(activity?.ends_at ?? null)}
          />
        </label>

        <label>
          Organiza
          <input
            maxLength={120}
            name="organizer_name"
            placeholder="Padres TEA Salta"
            type="text"
            defaultValue={activity?.organizer_name ?? ""}
          />
        </label>

        <label>
          Lugar
          <input
            maxLength={140}
            name="location_name"
            placeholder="Sede, plaza, salon o link si es virtual"
            type="text"
            defaultValue={activity?.location_name ?? ""}
          />
        </label>

        <label className="admin-field-full">
          Direccion
          <input
            maxLength={180}
            name="address"
            placeholder="Direccion, si hace falta"
            type="text"
            defaultValue={activity?.address ?? ""}
          />
        </label>

        <label className="admin-field-full">
          Link de inscripcion
          <input
            name="registration_url"
            placeholder="https://..."
            type="url"
            defaultValue={activity?.registration_url ?? ""}
          />
        </label>
      </div>

      <label className="admin-checkbox">
        <input
          name="is_featured"
          type="checkbox"
          defaultChecked={activity?.is_featured ?? false}
        />
        <span>Marcar como destacada</span>
      </label>

      <div className="admin-form-actions">
        <button className="button primary" type="submit">
          {submitLabel}
        </button>
        {cancelHref ? (
          <Link className="button secondary" href={cancelHref}>
            Cancelar
          </Link>
        ) : null}
      </div>
    </form>
  );
}
