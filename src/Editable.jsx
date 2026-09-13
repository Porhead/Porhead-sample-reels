import { useEffect, useRef, useState } from "react";

export function Editable({
  editKey,
  value,
  editing,
  onSave,
  as: Tag = "span",
  className,
  style,
  onFocusEdit,
}) {
  const [draft, setDraft] = useState(value);
  const ref = useRef(null);

  useEffect(() => {
    setDraft(value);
  }, [value, editKey]);

  useEffect(() => {
    if (!editing || !ref.current) return;
    ref.current.textContent = draft;
  }, [editing, draft]);

  const notifyFocus = (element) => {
    if (editing) onFocusEdit?.(editKey, element);
  };


  if (!editing) {
    return (
    <Tag className={className} style={style} data-edit-key={editKey}>
        {value}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={`${className || ""} is-editable`}
      style={style}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onFocus={(event) => notifyFocus(event.currentTarget)}
      onBlur={() => {
        const next = ref.current?.innerText?.trim() ?? "";
        if (next !== value) onSave(editKey, next);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" && event.shiftKey) {
          document.execCommand("insertLineBreak");
          event.preventDefault();
        }
      }}
      onClick={(event) => {
        if (editing) {
          event.stopPropagation();
          notifyFocus(event.currentTarget);
        }
      }}
      data-edit-key={editKey}
    />
  );
}
