import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import React from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowDown from "lucide-react/dist/esm/icons/arrow-down.js";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right.js";
import Box from "lucide-react/dist/esm/icons/box.js";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down.js";
import ChevronUp from "lucide-react/dist/esm/icons/chevron-up.js";
import CircleStop from "lucide-react/dist/esm/icons/circle-stop.js";
import Cuboid from "lucide-react/dist/esm/icons/cuboid.js";
import Factory from "lucide-react/dist/esm/icons/factory.js";
import KeyRound from "lucide-react/dist/esm/icons/key-round.js";
import Layers3 from "lucide-react/dist/esm/icons/layers-3.js";
import LockKeyhole from "lucide-react/dist/esm/icons/lock-keyhole.js";
import Mail from "lucide-react/dist/esm/icons/mail.js";
import MessageCircle from "lucide-react/dist/esm/icons/message-circle.js";
import Move from "lucide-react/dist/esm/icons/move.js";
import MousePointer2 from "lucide-react/dist/esm/icons/mouse-pointer-2.js";
import PencilLine from "lucide-react/dist/esm/icons/pencil-line.js";
import Phone from "lucide-react/dist/esm/icons/phone.js";
import Plus from "lucide-react/dist/esm/icons/plus.js";
import Printer from "lucide-react/dist/esm/icons/printer.js";
import RotateCcw from "lucide-react/dist/esm/icons/rotate-ccw.js";
import Route from "lucide-react/dist/esm/icons/route.js";
import Sparkles from "lucide-react/dist/esm/icons/sparkles.js";
import Type from "lucide-react/dist/esm/icons/type.js";
import X from "lucide-react/dist/esm/icons/x.js";
import Check from "lucide-react/dist/esm/icons/check.js";
import ImageIcon from "lucide-react/dist/esm/icons/image.js";
import LogOut from "lucide-react/dist/esm/icons/log-out.js";
import Upload from "lucide-react/dist/esm/icons/upload.js";
import { Editable } from "./Editable";
import {
  NAV,
  PROFILE,
  PROJECTS,
  SECTIONS,
  SITE,
  STRENGTHS,
} from "./data";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const DRAG_SCROLL_MULTIPLIER = 2.35;

function resolveAssetPath(value) {
  if (!value) return value;
  if (/^(data:|blob:|https?:|file:|#)/i.test(value)) return value;

  const base = import.meta.env.BASE_URL || "./";
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  const relativePath = value.replace(/^\.?\//, "");
  return `${normalizedBase}${relativePath}`;
}

const ICONS = {
  Box,
  Cuboid,
  Factory,
  Sparkles,
  Route,
  Layers3,
};

const EDIT_KEY = "porhead-product-portfolio-edits-v2";

function useLocalEdits() {
  const [edits, setEdits] = useState({});
  const [baseEdits, setBaseEdits] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`${import.meta.env.BASE_URL}saved-edits.json`)
      .then((response) => (response.ok ? response.json() : {}))
      .then((saved) => {
        if (!alive) return;
        let localEdits = {};
        try {
          localEdits = JSON.parse(localStorage.getItem(EDIT_KEY)) || {};
        } catch {
          localEdits = {};
        }
        setBaseEdits(saved);
        setEdits({ ...saved, ...localEdits });
        setReady(true);
      })
      .catch(() => {
        if (!alive) return;
        let localEdits = {};
        try {
          localEdits = JSON.parse(localStorage.getItem(EDIT_KEY)) || {};
        } catch {
          localEdits = {};
        }
        setEdits(localEdits);
        setReady(true);
      });

    return () => {
      alive = false;
    };
  }, []);

  const persistEdits = useCallback((nextEdits) => {
    try {
      localStorage.setItem(EDIT_KEY, JSON.stringify(nextEdits));
    } catch {
      // Ignore storage quota or privacy-mode errors.
    }

    fetch("/api/save-edits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextEdits),
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!ready) return;
    persistEdits(edits);
  }, [edits, ready, persistEdits]);

  const syncEdits = useCallback(() => {
    persistEdits(edits);
  }, [edits, persistEdits]);

  const save = useCallback((key, value) => {
    setEdits((current) => ({ ...current, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setEdits({ ...baseEdits });
  }, [baseEdits]);

  const remove = useCallback((key) => {
    setEdits((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  }, []);

  return { edits, save, remove, reset, syncEdits };
}

function PasswordGate({ open, onClose, onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setValue("");
    setError(false);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [open]);

  if (!open) return null;

  const submit = (event) => {
    event.preventDefault();
    if (value === SITE.password) {
      onUnlock();
      return;
    }
    setError(true);
    setValue("");
    inputRef.current?.focus();
  };

  return (
    <div className="editor-gate" role="dialog" aria-modal="true" aria-label="编辑模式密码">
      <button className="editor-gate__backdrop" onClick={onClose} aria-label="关闭" />
      <form className="editor-gate__panel" onSubmit={submit}>
        <div className="editor-gate__head">
          <span className="editor-gate__icon">
            <LockKeyhole size={18} />
          </span>
          <button type="button" className="icon-button" onClick={onClose} aria-label="关闭">
            <X size={18} />
          </button>
        </div>
        <p className="section-kicker">EDITOR ACCESS</p>
        <h2>进入编辑模式</h2>
        <p className="editor-gate__hint">输入密码后，可点击页面文字或图片进行修改，内容自动保存到本机。</p>
        <label className="editor-gate__label" htmlFor="editor-password">PASSWORD</label>
        <input
          ref={inputRef}
          id="editor-password"
          type="password"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setError(false);
          }}
          placeholder="••••••••••"
          autoComplete="off"
        />
        <div className={`editor-gate__error ${error ? "is-visible" : ""}`}>密码不正确，请重试</div>
        <button type="submit" className="solid-button editor-gate__submit">
          解锁编辑模式 <ArrowUpRight size={17} />
        </button>
      </form>
    </div>
  );
}


function ImageEditor({ target, onClose, onSave, onReset }) {
  const [url, setUrl] = useState(target?.current || "");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    if (!target) return;
    setUrl(target.current || "");
    setFileName("");
    setError("");
  }, [target]);

  if (!target) return null;

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      setError("图片超过 8MB，请先压缩后再上传。");
      return;
    }
    setError("");
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const preview = new window.Image();
      preview.onload = () => {
        const maxEdge = 1600;
        const scale = Math.min(1, maxEdge / Math.max(preview.width, preview.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(preview.width * scale));
        canvas.height = Math.max(1, Math.round(preview.height * scale));
        const context = canvas.getContext("2d");
        context.drawImage(preview, 0, 0, canvas.width, canvas.height);
        setUrl(canvas.toDataURL("image/jpeg", 0.86));
      };
      preview.onerror = () => setUrl(reader.result);
      preview.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="image-editor" role="dialog" aria-modal="true" aria-label="替换图片">
      <button className="image-editor__backdrop" onClick={onClose} aria-label="关闭" />
      <div className="image-editor__panel">
        <div className="image-editor__head">
          <div className="image-editor__title">
            <ImageIcon size={17} />
            <span>替换图片</span>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="关闭">
            <X size={18} />
          </button>
        </div>

        <div className="image-editor__preview">
          {url ? <img src={resolveAssetPath(url)} alt="图片预览" /> : <span>暂无图片</span>}
        </div>

        <label className="image-editor__upload">
          <Upload size={16} />
          <span>{fileName || "上传本地图片"}</span>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} />
        </label>

        <label className="image-editor__label" htmlFor="image-editor-url">IMAGE URL</label>
        <input
          id="image-editor-url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://..."
        />
        {error && <p className="image-editor__error">{error}</p>}

        <div className="image-editor__actions">
          <button type="button" className="image-editor__reset" onClick={() => { onReset(target.key); onClose(); }}>
            恢复原图
          </button>
          <button type="button" className="solid-button" onClick={() => { onSave(target.key, url); onClose(); }}>
            <Check size={16} /> 保存图片
          </button>
        </div>
      </div>
    </div>
  );
}

function ImagePreview({ src, onClose }) {
  if (!src) return null;

  return (
    <div className="image-preview" role="dialog" aria-modal="true" aria-label="图片预览" onClick={onClose}>
      <div className="image-preview__frame" onClick={onClose}>
        <img src={src} alt="项目图片预览" />
      </div>
      <button type="button" className="icon-button image-preview__close" onClick={onClose} aria-label="关闭图片预览">
        <X size={22} />
      </button>
    </div>
  );
}

function StyleEditor({ targetKey, value, onSave, onReset, onClose }) {
  const [draft, setDraft] = useState({ x: 0, y: 0, width: "", fontSize: "" });

  useEffect(() => {
    setDraft({
      x: value?.x || 0,
      y: value?.y || 0,
      width: value?.width || "",
      fontSize: value?.fontSize || "",
    });
  }, [targetKey, value]);

  if (!targetKey) return null;

  const update = (field, rawValue) => {
    const numeric = rawValue === "" ? "" : Number(rawValue);
    const next = { ...draft, [field]: numeric };
    setDraft(next);

    const clean = {};
    if (next.x) clean.x = Number(next.x) || 0;
    if (next.y) clean.y = Number(next.y) || 0;
    if (next.width) clean.width = Number(next.width) || 0;
    if (next.fontSize) clean.fontSize = Number(next.fontSize) || 0;

    if (Object.keys(clean).length) onSave(targetKey, clean);
    else onReset(targetKey);
  };

  const reset = () => {
    setDraft({ x: 0, y: 0, width: "", fontSize: "" });
    onReset(targetKey);
  };

  return (
    <div className="style-editor" role="dialog" aria-label="文本框样式">
      <div className="style-editor__head">
        <Type size={16} />
        <span>文本框样式</span>
        <button type="button" className="icon-button" onClick={onClose} aria-label="关闭样式面板">
          <X size={16} />
        </button>
      </div>
      <div className="style-editor__grid">
        <label>
          <span>水平偏移</span>
          <input type="number" value={draft.x} onChange={(event) => update("x", event.target.value)} />
        </label>
        <label>
          <span>垂直偏移</span>
          <input type="number" value={draft.y} onChange={(event) => update("y", event.target.value)} />
        </label>
        <label>
          <span>宽度 px</span>
          <input type="number" min="0" value={draft.width} onChange={(event) => update("width", event.target.value)} />
        </label>
        <label>
          <span>字号 px</span>
          <input type="number" min="0" value={draft.fontSize} onChange={(event) => update("fontSize", event.target.value)} />
        </label>
      </div>
      <button type="button" className="style-editor__reset" onClick={reset}>重置样式</button>
    </div>
  );
}

function ProjectEditorModal({ open, nextNum, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    cn: "",
    meta: "",
    role: "",
    year: "2026",
    category: "",
    image: "",
    summary: "",
    tags: "",
  });
  const [fileName, setFileName] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    if (open) setFileName("");
  }, [open]);

  if (!open) return null;

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      alert("图片超过 8MB，请压缩后再上传。");
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      set("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submit = (event) => {
    event.preventDefault();
    const id = `custom-${Date.now().toString(36)}`;
    const tags = form.tags
      .split(/[,，]/)
      .map((item) => item.trim())
      .filter(Boolean);

    const project = {
      id,
      num: nextNum,
      title: form.title || "NEW PROJECT",
      cn: form.cn || "未命名项目",
      meta: form.meta || "PRODUCT · DESIGN · PROTOTYPE",
      role: form.role || "个人项目",
      year: form.year || "2026",
      category: form.category || "PRODUCT DESIGN",
      image: form.image || "/assets/project-rhino.jpg",
      detailImage: form.image || "/assets/project-rhino.jpg",
      summary: form.summary || "新的项目案例。",
      tags: tags.length ? tags : ["产品设计"],
      caseStudy: [
        { step: "Problem", title: "问题定义", copy: "进入编辑模式后可继续完善该项目的 Case Study 内容。" },
        { step: "Insight", title: "洞察", copy: "进入编辑模式后可继续完善该项目的 Case Study 内容。" },
        { step: "Decision", title: "决定", copy: "进入编辑模式后可继续完善该项目的 Case Study 内容。" },
        { step: "Design", title: "设计", copy: "进入编辑模式后可继续完善该项目的 Case Study 内容。" },
        { step: "Prototype", title: "原型制作", copy: "进入编辑模式后可继续完善该项目的 Case Study 内容。" },
        { step: "Result", title: "结果", copy: "进入编辑模式后可继续完善该项目的 Case Study 内容。" },
      ],
    };

    onSave(project);
    onClose();
  };

  return (
    <div className="project-editor" role="dialog" aria-modal="true" aria-label="新增项目">
      <button className="project-editor__backdrop" onClick={onClose} aria-label="关闭" />
      <form className="project-editor__panel" onSubmit={submit}>
        <div className="project-editor__head">
          <div>
            <span>NEW CASE STUDY</span>
            <h2>新增项目</h2>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="关闭"><X size={18} /></button>
        </div>
        <div className="project-editor__fields">
          <label>项目标题<input value={form.title} onChange={(event) => set("title", event.target.value)} /></label>
          <label>中文名称<input value={form.cn} onChange={(event) => set("cn", event.target.value)} /></label>
          <label>项目类型<input value={form.category} onChange={(event) => set("category", event.target.value)} placeholder="PRODUCT DESIGN" /></label>
          <label>年份<input value={form.year} onChange={(event) => set("year", event.target.value)} /></label>
          <label>角色<input value={form.role} onChange={(event) => set("role", event.target.value)} /></label>
          <label>标签<input value={form.tags} onChange={(event) => set("tags", event.target.value)} placeholder="用逗号分隔" /></label>
          <label className="project-editor__wide">项目简介<textarea value={form.summary} onChange={(event) => set("summary", event.target.value)} rows="4" /></label>
          <label className="project-editor__wide">图片地址<input value={form.image} onChange={(event) => set("image", event.target.value)} placeholder="/assets/project-rhino.jpg 或 https://..." /></label>
          <button type="button" className="project-editor__upload" onClick={() => fileRef.current?.click()}>
            <Upload size={16} /> {fileName || "上传项目图片"}
          </button>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
        </div>
        <button type="submit" className="solid-button project-editor__submit">保存项目 <Plus size={16} /></button>
      </form>
    </div>
  );
}

function CaseStudy({ project, onClose, editing, detailImage, onImageEdit, onImagePreview, renderEditable, onExportPdf }) {
  const modalRef = useRef(null);
  const panelRef = useRef(null);

  useLayoutEffect(() => {
    if (!project) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousScrollY = window.scrollY;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".case-study__backdrop",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        ".case-study__panel",
        { yPercent: 16, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "power4.out" }
      );
      gsap.fromTo(
        ".case-study__visual",
        { clipPath: "inset(100% 0 0 0)", y: 50 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 1.15,
          delay: 0.18,
          ease: "power4.out",
        }
      );
      gsap.fromTo(
        ".case-step",
        { y: 34, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.075,
          delay: 0.28,
          ease: "power3.out",
        }
      );
    }, modalRef);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.scrollTo({ top: previousScrollY, behavior: "instant" });
      ctx.revert();
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="case-study" ref={modalRef} role="dialog" aria-modal="true" aria-label={project.title}>
      <button className="case-study__backdrop" onClick={onClose} aria-label="关闭案例" />
      <div className="case-study__panel" ref={panelRef}>
        <header className="case-study__header">
          <div className="case-study__mark">
            {renderEditable("case-brand", "Porhead / CASE", "span")}
            {renderEditable(`case-${project.id}-number`, project.num, "strong")}
          </div>
          <button className="case-study__pdf button-hover" onClick={onExportPdf} aria-label="导出案例 PDF">
            <Printer size={15} /> 导出 PDF
          </button>
          <button className="icon-button case-study__close" onClick={onClose} aria-label="关闭">
            <X size={22} />
          </button>
        </header>

        <div className="case-study__content">
          <div className="case-study__visual">
            <div className="case-study__visual-frame">
              <img
                className={editing ? "is-image-editable" : ""}
                src={detailImage}
                alt={project.cn}
                onClick={editing ? onImageEdit : () => onImagePreview(detailImage)}
              />
            </div>
            <div className="case-study__visual-meta">
              {renderEditable(`case-${project.id}-category`, project.category, "span")}
              {renderEditable(`case-${project.id}-year`, project.year, "span")}
            </div>
          </div>

          <div className="case-study__body">
            {renderEditable(`case-${project.id}-meta`, project.meta, "p", "section-kicker")}
            <h2 className="case-study__title">
              {renderEditable(`case-${project.id}-title`, project.title, "span")}
              {renderEditable(`case-${project.id}-cn`, project.cn, "em")}
            </h2>
            {renderEditable(`case-${project.id}-summary`, project.summary, "p", "case-study__summary")}

            <div className="case-study__meta">
              <div>
                {renderEditable(`case-${project.id}-role-label`, "ROLE", "span")}
                {renderEditable(`case-${project.id}-role`, project.role, "strong")}
              </div>
              <div>
                {renderEditable(`case-${project.id}-type-label`, "TYPE", "span")}
                {renderEditable(`case-${project.id}-category`, project.category, "strong")}
              </div>
              <div className="case-study__tags">
                {project.tags.map((tag, index) => (
                  <span key={tag}>{renderEditable(`case-${project.id}-tag-${index}`, tag, "span")}</span>
                ))}
              </div>
            </div>

            <div className="case-flow">
              <div className="case-flow__legend">
                {renderEditable(`case-${project.id}-problem-label`, "PROBLEM", "span")}
                <span>→</span>
                {renderEditable(`case-${project.id}-insight-label`, "INSIGHT", "span")}
                <span>→</span>
                {renderEditable(`case-${project.id}-decision-label`, "DECISION", "span")}
                <span>→</span>
                {renderEditable(`case-${project.id}-design-label`, "DESIGN", "span")}
                <span>→</span>
                {renderEditable(`case-${project.id}-prototype-label`, "PROTOTYPE", "span")}
                <span>→</span>
                {renderEditable(`case-${project.id}-result-label`, "RESULT", "span")}
              </div>
              <div className="case-steps">
                {project.caseStudy.map((item, index) => (
                  <article className="case-step" key={item.step}>
                    <div className="case-step__index">
                      <span>0{index + 1}</span>
                      {renderEditable(`case-${project.id}-step-${index}-name`, item.step, "b")}
                    </div>
                    <div className="case-step__copy">
                      <h3>{renderEditable(`case-${project.id}-step-${index}-title`, item.title)}</h3>
                      <p>{renderEditable(`case-${project.id}-step-${index}-copy`, item.copy)}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageRail({ onNavigate, setActiveSection }) {
  const trackRef = useRef(null);
  const handleRef = useRef(null);
  const draggingRef = useRef(false);

  const moveHandle = useCallback(() => {
    if (!trackRef.current || !handleRef.current) return;
    const track = trackRef.current.getBoundingClientRect();
    const handle = handleRef.current.getBoundingClientRect();
    const usable = Math.max(1, track.height - handle.height);
    const progress = gsap.utils.clamp(
      0,
      1,
      window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    );
    handleRef.current.style.transform = `translateY(${progress * usable}px)`;
  }, []);

  const moveByClientY = useCallback((clientY) => {
    if (!trackRef.current) return;
    const track = trackRef.current.getBoundingClientRect();
    const handleHeight = handleRef.current?.getBoundingClientRect().height || 44;
    const usable = Math.max(1, track.height - handleHeight);
    const local = gsap.utils.clamp(0, usable, clientY - track.top - handleHeight / 2);
    const progress = local / usable;
    const target = progress * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: target, behavior: "auto" });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      moveHandle();
      const current = SECTIONS.findLast((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        return el.getBoundingClientRect().top <= window.innerHeight * 0.38;
      });
      if (current) setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [moveHandle, setActiveSection]);

  const onPointerDown = (event) => {
    if (!trackRef.current) return;
    draggingRef.current = true;
    trackRef.current.setPointerCapture?.(event.pointerId);
    trackRef.current.classList.add("is-dragging");
    moveByClientY(event.clientY);
  };

  const onPointerMove = (event) => {
    if (!draggingRef.current) return;
    moveByClientY(event.clientY);
  };

  const endDrag = (event) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    trackRef.current?.classList.remove("is-dragging");
    trackRef.current?.releasePointerCapture?.(event.pointerId);
  };

  return (
    <div className="page-rail" aria-hidden="true">
      <div className="page-rail__hint">
        <MousePointer2 size={14} />
      </div>
      <div
        ref={trackRef}
        className="page-rail__track"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div ref={handleRef} className="page-rail__handle">
          <span />
        </div>
      </div>
      <button className="page-rail__arrow" onClick={() => onNavigate(-1)} aria-label="上一模块">
        <ChevronUp size={16} />
      </button>
      <button className="page-rail__arrow" onClick={() => onNavigate(1)} aria-label="下一模块">
        <ChevronDown size={16} />
      </button>
    </div>
  );
}

function App() {
  const rootRef = useRef(null);
  const railRef = useRef(null);
  const [introDone, setIntroDone] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [imageTarget, setImageTarget] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [styleTarget, setStyleTarget] = useState(null);
  const [projectFormOpen, setProjectFormOpen] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const dragStateRef = useRef(null);
  const suppressClickRef = useRef(false);
  const { edits, save, remove, reset, syncEdits } = useLocalEdits();

  const text = useCallback((key, fallback) => edits[key] ?? fallback, [edits]);
  const image = useCallback((key, fallback) => edits[`image:${key}`] ?? fallback, [edits]);

  const getStyle = useCallback((key) => {
    const raw = edits[`style:${key}`];
    if (!raw) return null;
    if (typeof raw === "string") {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    return raw;
  }, [edits]);

  const saveStyle = useCallback((key, value) => save(`style:${key}`, value), [save]);
  const resetStyle = useCallback((key) => remove(`style:${key}`), [remove]);

  const extraProjects = useMemo(() => {
    const raw = edits["extra-projects"];
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "string") {
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }, [edits]);

  const allProjects = useMemo(
    () => [...PROJECTS, ...extraProjects],
    [extraProjects]
  );
  const nextProjectNum = String(PROJECTS.length + extraProjects.length + 1).padStart(2, "0");

  const openImageEditor = useCallback(
    (event, key, fallback) => {
      if (!editing) return;
      event.preventDefault();
      event.stopPropagation();
      setImageTarget({ key, current: image(key, fallback), fallback });
    },
    [editing, image]
  );

  const saveImage = useCallback(
    (key, value) => save(`image:${key}`, value),
    [save]
  );

  const resetImage = useCallback(
    (key) => remove(`image:${key}`),
    [remove]
  );

  const imageProps = useCallback(
    (key, fallback, extraClass = "") => {
      const src = image(key, fallback);
      return {
        src: resolveAssetPath(src),
        className: [extraClass, editing ? "is-image-editable" : ""].filter(Boolean).join(" "),
        "data-image-edit-key": key,
        "data-image-edit-fallback": fallback,
        onClick: editing ? (event) => openImageEditor(event, key, fallback) : undefined,
      };
    },
    [editing, image, openImageEditor]
  );

  const editable = useCallback(
    (key, fallback, as = "span", className) => {
      const styleOverride = getStyle(key);
      const style = styleOverride
        ? {
            position: styleOverride.x || styleOverride.y || styleOverride.width ? "relative" : undefined,
            left: styleOverride.x ? `${styleOverride.x}px` : undefined,
            top: styleOverride.y ? `${styleOverride.y}px` : undefined,
            width: styleOverride.width ? `${styleOverride.width}px` : undefined,
            display: styleOverride.width ? "inline-block" : undefined,
            fontSize: styleOverride.fontSize ? `${styleOverride.fontSize}px` : undefined,
          }
        : undefined;

      return (
        <Editable
          editKey={key}
          value={text(key, fallback)}
          editing={editing}
          onSave={save}
          as={as}
          className={className}
          style={style}
          onFocusEdit={editing ? (editKey) => setStyleTarget(editKey) : undefined}
        />
      );
    },
    [editing, save, text, getStyle]
  );

  const handleHeroImageCapture = useCallback(
    (event) => {
      if (!editing) return;

      const target = event.target;
      if (target.closest?.(".is-editable") || target.closest?.("button, a")) return;

      const directImage = target.closest?.(".hero__visual img.is-image-editable");
      if (directImage) {
        openImageEditor(
          event,
          directImage.dataset.imageEditKey,
          directImage.dataset.imageEditFallback
        );
        return;
      }

      const imageUnderPoint = document
        .elementsFromPoint(event.clientX, event.clientY)
        .find((el) => el.classList?.contains("is-image-editable") && el.closest?.(".hero__visual"));

      if (imageUnderPoint) {
        openImageEditor(
          event,
          imageUnderPoint.dataset.imageEditKey,
          imageUnderPoint.dataset.imageEditFallback
        );
      }
    },
    [editing, openImageEditor]
  );

  useEffect(() => {
    document.body.classList.toggle("is-editing", editing);
    if (editing) setEditorOpen(false);
  }, [editing]);

  useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
  }, [introDone]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    if (!finePointer || !dot || !ring) return undefined;

    document.documentElement.classList.add("has-custom-cursor");
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const move = (event) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);

      const target = event.target?.closest?.(
        "a, button, .project-card, .is-image-editable, .is-editable, .page-rail__track"
      );
      ring.classList.toggle("is-hover", Boolean(target));
      ring.classList.toggle(
        "is-text",
        event.target?.isContentEditable || event.target?.closest?.(".is-editable")
      );
    };

    const down = () => ring.classList.add("is-down");
    const up = () => ring.classList.remove("is-down");
    const leave = () => { document.documentElement.classList.remove("is-visible"); };
    const enter = () => { document.documentElement.classList.add("is-visible"); };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor", "is-visible");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    const items = gsap.utils.toArray(
      ".button-hover, .icon-button, .project-card__link, .page-rail__arrow"
    );
    const cleanups = items.map((element) => {
      const xTo = gsap.quickTo(element, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(element, "y", { duration: 0.4, ease: "power3.out" });

      const move = (event) => {
        const rect = element.getBoundingClientRect();
        const x = gsap.utils.clamp(-9, 9, (event.clientX - (rect.left + rect.width / 2)) * 0.24);
        const y = gsap.utils.clamp(-7, 7, (event.clientY - (rect.top + rect.height / 2)) * 0.24);
        xTo(x);
        yTo(y);
      };

      const leave = () => { xTo(0); yTo(0); };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", leave);

      return () => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  const navigate = useCallback(
    (direction) => {
      if (!introDone || activeProject) return;
      const currentIndex = Math.max(
        0,
        SECTIONS.findIndex((id) => id === activeSection)
      );
      const nextIndex = Math.min(
        SECTIONS.length - 1,
        Math.max(0, currentIndex + direction)
      );
      const nextId = SECTIONS[nextIndex];
      document.getElementById(nextId)?.scrollIntoView({ behavior: "smooth" });
    },
    [activeProject, activeSection, introDone]
  );

  useEffect(() => {
    if (!introDone || activeProject || editorOpen || imageTarget || imagePreview) return undefined;

    const isInteractive = (target) =>
      target?.closest?.(
        "a, button, input, textarea, select, [contenteditable='true'], .is-editable, .is-image-editable, .case-study, .image-editor, .editor-gate"
      );

    const onPointerDown = (event) => {
      if (event.pointerType === "touch") return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (isInteractive(event.target)) return;

      dragStateRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        lastX: event.clientX,
        lastY: event.clientY,
        moved: false,
      };
    };

    const onPointerMove = (event) => {
      const state = dragStateRef.current;
      if (!state || state.pointerId !== event.pointerId) return;

      const distance = Math.hypot(event.clientX - state.startX, event.clientY - state.startY);
      if (!state.moved && distance < 6) return;

      state.moved = true;
      const deltaX = (state.lastX - event.clientX) * DRAG_SCROLL_MULTIPLIER;
      const deltaY = (state.lastY - event.clientY) * DRAG_SCROLL_MULTIPLIER;
      window.scrollBy(deltaX, deltaY);
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      document.body.classList.add("is-dragging-page");
    };

    const endDrag = (event) => {
      const state = dragStateRef.current;
      if (!state || state.pointerId !== event.pointerId) return;
      suppressClickRef.current = state.moved;
      dragStateRef.current = null;
      document.body.classList.remove("is-dragging-page");
    };

    const onClickCapture = (event) => {
      if (!suppressClickRef.current) return;
      event.stopPropagation();
      event.preventDefault();
      suppressClickRef.current = false;
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    document.addEventListener("click", onClickCapture, true);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      document.removeEventListener("click", onClickCapture, true);
      document.body.classList.remove("is-dragging-page");
    };
  }, [activeProject, editorOpen, imagePreview, imageTarget, introDone]);

  const exportPageToPdf = useCallback(async () => {
    if (pdfBusy) return;
    setPdfBusy(true);

    const hidden = [];
    const hide = (selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        hidden.push([element, element.style.display]);
        element.style.display = "none";
      });
    };

    const restoreHidden = () => {
      hidden.forEach(([element, display]) => {
        element.style.display = display;
      });
    };

    hide(".cursor-dot");
    hide(".cursor-ring");
    hide(".page-rail");
    hide(".edit-mode-banner");
    hide(".image-preview");
    hide(".image-editor");
    hide(".editor-gate");

    try {
      const target = activeProject
        ? document.querySelector(".case-study__panel")
        : document.querySelector(".site");
      if (!target) throw new Error("No PDF target");

      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(target, {
        scale: Math.min(2, Math.max(1.5, window.devicePixelRatio || 1)),
        useCORS: true,
        allowTaint: false,
        backgroundColor: "#e8e2d6",
        windowWidth: activeProject ? target.scrollWidth : document.documentElement.scrollWidth,
        windowHeight: activeProject ? target.scrollHeight : document.documentElement.scrollHeight,
        logging: false,
      });

      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
      const pageWidth = 210;
      const pageHeight = 297;
      const imageWidth = pageWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;
      let heightLeft = imageHeight;
      let position = 0;

      pdf.addImage(imageData, "PNG", 0, position, imageWidth, imageHeight, undefined, "FAST");
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imageData, "PNG", 0, position, imageWidth, imageHeight, undefined, "FAST");
        heightLeft -= pageHeight;
      }

      pdf.save(activeProject ? `${activeProject.id}-case-study.pdf` : "Porhead-Portfolio.pdf");
    } catch (error) {
      console.error("PDF export failed, falling back to browser print:", error);
      window.print();
    } finally {
      restoreHidden();
      setPdfBusy(false);
    }
  }, [activeProject, pdfBusy]);


  useEffect(() => {
    const onKeyDown = (event) => {
      if (imagePreview) {
        if (event.key === "Escape") setImagePreview(null);
        return;
      }

      if (activeProject || editorOpen || imageTarget || projectFormOpen || pdfBusy) {
        if (event.key === "Escape" && activeProject) setActiveProject(null);
        if (event.key === "Escape" && imageTarget) setImageTarget(null);
        return;
      }

      const target = event.target;
      const isTyping =
        target?.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName);

      if (isTyping) return;

      if (event.key === "ArrowDown" || (event.code === "Space" && !event.shiftKey)) {
        event.preventDefault();
        navigate(1);
      }
      if (event.key === "ArrowUp" || (event.code === "Space" && event.shiftKey)) {
        event.preventDefault();
        navigate(-1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeProject, editorOpen, imageTarget, imagePreview, navigate, projectFormOpen, pdfBusy]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power4.inOut" },
        onComplete: () => setIntroDone(true),
      });

      intro
        .set(".intro__bar", { yPercent: 0, transformOrigin: "center top" })
        .from(".intro__mark", { yPercent: 125, duration: 0.95, ease: "power4.out" }, 0.05)
        .from(".intro__code", { y: 20, autoAlpha: 0, duration: 0.6, ease: "power3.out" }, 0.25)
        .to(".intro__bar--a", { yPercent: -101, duration: 0.85 }, 0.62)
        .to(".intro__bar--b", { yPercent: -101, duration: 0.85 }, "<0.08")
        .to(".intro__bar--c", { yPercent: -101, duration: 0.85 }, "<0.08")
        .to(".intro__content", { yPercent: -20, autoAlpha: 0, duration: 0.45, ease: "power3.in" }, "<0.2")
        .to(".intro", { yPercent: -100, duration: 1.0, ease: "power4.inOut" }, "-=0.05");

      const hero = gsap.timeline({ delay: 1.95, defaults: { ease: "power4.out" } });
      hero
        .from(".hero__title .line-inner", {
          yPercent: 118,
          scaleY: 1.5,
          rotation: 2,
          duration: 1.25,
          stagger: 0.105,
        })
        .from(".hero__eyebrow", { y: 24, autoAlpha: 0, duration: 0.7 }, "-=0.65")
        .from(".hero__description", { y: 26, autoAlpha: 0, duration: 0.85 }, "-=0.5")
        .from(".hero__actions", { y: 24, autoAlpha: 0, duration: 0.7 }, "-=0.6")
        .from(".hero-product", {
          clipPath: "inset(100% 0 0 0)",
          y: 70,
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
        }, "-=0.9")
        .from(".hero__red-block", { scaleX: 0, duration: 1.3, transformOrigin: "left center" }, "-=1.25")
        .from(".hero__aside", { x: 28, autoAlpha: 0, duration: 0.9 }, "-=0.8");

      gsap.to(".hero__red-block", {
        yPercent: 5,
        rotation: 0.75,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".hero__visual", {
        yPercent: -4,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".hero-product--a", { y: -12, rotation: -0.6, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".hero-product--b", { y: 10, rotation: 0.5, duration: 8.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".hero-product--c", { y: -8, rotation: 0.4, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });

      gsap.utils.toArray("[data-reveal-title]").forEach((title) => {
        const lines = title.querySelectorAll(".line-inner");
        gsap.fromTo(
          lines,
          { yPercent: 118, rotate: 1.4 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.15,
            stagger: 0.09,
            ease: "power4.out",
            scrollTrigger: {
              trigger: title,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray(".reveal-up").forEach((item) => {
        gsap.fromTo(
          item,
          { y: 52, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 87%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray(".about__metric").forEach((metric, index) => {
        gsap.fromTo(
          metric,
          { y: 48, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            delay: (index % 4) * 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: metric,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      gsap.fromTo(
        ".about__portrait-media",
        { yPercent: 12, scale: 1.16 },
        {
          yPercent: -8,
          scale: 1,
          duration: 1.6,
          ease: "none",
          scrollTrigger: {
            trigger: ".about__portrait",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        }
      );

      gsap.utils.toArray(".project-card").forEach((card, index) => {
        const image = card.querySelector(".project-card__media img");
        gsap.fromTo(
          card,
          { clipPath: "inset(12% 0 12% 0)", y: 92, autoAlpha: 0 },
          {
            clipPath: "inset(0% 0 0% 0)",
            y: 0,
            autoAlpha: 1,
            duration: 1.15,
            delay: (index % 2) * 0.08,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.18, yPercent: -4 },
            {
              scale: 1,
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            }
          );
        }
      });

      gsap.utils.toArray(".strength-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 58, x: index % 2 ? 18 : -18, autoAlpha: 0 },
          {
            y: 0,
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            delay: (index % 3) * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      gsap.to(".marquee__track", {
        xPercent: -50,
        duration: 36,
        repeat: -1,
        ease: "none",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const onUnlock = () => {
    setEditing(true);
    setEditorOpen(false);
  };

  const openProject = (project) => setActiveProject(project);
  const closeProject = () => setActiveProject(null);
  const activeStyle = styleTarget ? getStyle(styleTarget) : null;

  const addProject = useCallback(
    (project) => {
      const next = [...extraProjects, project];
      save("extra-projects", next);
    },
    [extraProjects, save]
  );

  return (
    <div className="site" ref={rootRef}>
      <div className="site__grain" />

      {!introDone && (
        <div className="intro" aria-hidden="true">
          <div className="intro__bar intro__bar--a" />
          <div className="intro__bar intro__bar--b" />
          <div className="intro__bar intro__bar--c" />
          <div className="intro__content">
            <div className="intro__mark">Porhead / 27</div>
            <div className="intro__code">Porhead / 猪头肉 / DESIGN → PRODUCT → DELIVERY</div>
          </div>
        </div>
      )}

      <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={cursorRingRef} aria-hidden="true" />

      <header className={`topbar ${editing ? "is-editing" : ""}`}>
        <a className="topbar__brand" href="#hero">
          <span>{editable("brand-name", SITE.shortName)}</span>
          <b>{SITE.class}</b>
          {editable("brand-nickname", SITE.nickname, "em")}
        </a>
        <nav className="topbar__nav">
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? "is-active" : ""}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="topbar__actions">
          {editing && (
            <React.Fragment>
              <button className="topbar__exit" onClick={() => setEditing(false)}>
                <LogOut size={14} /> 退出编辑
              </button>
              <button className="topbar__edit-status" onClick={reset} title="重置全部编辑">
                <RotateCcw size={14} /> 重置
              </button>
            </React.Fragment>
          )}
          <button
            className="topbar__pdf button-hover"
            onClick={exportPageToPdf}
            aria-label="导出 PDF"
            title="导出 PDF"
            disabled={pdfBusy}
          >
            <Printer size={15} /> {pdfBusy ? "导出中…" : "导出 PDF"}
          </button>
          <button
            className={`icon-button topbar__edit ${editing ? "is-active" : ""}`}
            onClick={() => (editing ? setEditing(false) : setEditorOpen(true))}
            aria-label={editing ? "退出编辑模式" : "打开编辑模式"}
            title={editing ? "退出编辑模式" : "编辑模式"}
          >
            {editing ? <CircleStop size={17} /> : <PencilLine size={17} />}
          </button>
          <a className="topbar__contact button-hover" href="#contact">
            联系我 <ArrowUpRight size={15} />
          </a>
        </div>
      </header>

      {editing && (
        <div className="edit-mode-banner">
          <span>EDIT MODE</span>
          <p>点击文字或图片进行编辑，内容会自动保存到本机并同步到项目文件</p>
          <button className="edit-mode-banner__sync" onClick={syncEdits}>同步修改到项目</button>
          <button className="edit-mode-banner__exit" onClick={() => setEditing(false)}>
            <LogOut size={13} /> 退出编辑
          </button>
        </div>
      )}

      <PasswordGate open={editorOpen} onClose={() => setEditorOpen(false)} onUnlock={onUnlock} />

      <ImagePreview src={imagePreview} onClose={() => setImagePreview(null)} />

      <ImageEditor
        target={imageTarget}
        onClose={() => setImageTarget(null)}
        onSave={saveImage}
        onReset={resetImage}
      />

      {editing && (
        <StyleEditor
          targetKey={styleTarget}
          value={activeStyle}
          onSave={saveStyle}
          onReset={resetStyle}
          onClose={() => setStyleTarget(null)}
        />
      )}

      <ProjectEditorModal
        open={projectFormOpen}
        nextNum={nextProjectNum}
        onClose={() => setProjectFormOpen(false)}
        onSave={addProject}
      />

      <main>
        <section className="hero section-frame" id="hero" onClickCapture={handleHeroImageCapture}>
          <div className="hero__grid" />
          <div className="hero__red-block" />
          <div className="hero__aside">
            <span>PORTFOLIO</span>
            <span>Porhead / 猪头肉</span>
            <span>TOY / PRODUCT / IP</span>
            <span>2026 — 27</span>
          </div>

          <div className="hero__content">
            <div className="hero__eyebrow">
              {editable("hero-eyebrow", "TOY DESIGN / PRODUCT DEVELOPMENT / IP DERIVATIVES")}
            </div>
            <h1 className="hero__title" data-reveal-title>
              <span className="line-mask">{editable("hero-title-1", "MAKE", "span", "line-inner")}</span>
              <span className="line-mask hero__title-outline">{editable("hero-title-2", "IT", "span", "line-inner")}</span>
              <span className="line-mask hero__title-last">{editable("hero-title-3", "REAL.", "span", "line-inner")}</span>
            </h1>
            <div className="hero__bottom">
              <p className="hero__description">
                {editable(
                  "hero-description",
                  "我是一名玩具设计背景的产品开发型设计师。\n擅长把创意推过结构、制造与真实市场，让产品真正落地。"
                )}
              </p>
              <div className="hero__actions">
                <button className="circle-button button-hover" onClick={() => navigate(1)} aria-label="浏览下一模块">
                  <ArrowDown size={21} />
                </button>
                <button className="text-button button-hover" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                  查看作品 <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {editing && (
            <div className="hero-image-edit-toolbar" aria-label="首屏图片编辑">
              <button type="button" className="hero-image-edit-button button-hover" onClick={(event) => openImageEditor(event, "hero-rhino", "/assets/project-rhino.jpg")}>
                <ImageIcon size={13} /> 首屏图 01
              </button>
              <button type="button" className="hero-image-edit-button button-hover" onClick={(event) => openImageEditor(event, "hero-horse", "/assets/project-horse.jpg")}>
                <ImageIcon size={13} /> 首屏图 02
              </button>
              <button type="button" className="hero-image-edit-button button-hover" onClick={(event) => openImageEditor(event, "hero-badge", "/assets/project-club-badge.jpg")}>
                <ImageIcon size={13} /> 首屏图 03
              </button>
            </div>
          )}
          <div className={`hero__visual ${editing ? "is-editing" : ""}`} aria-hidden={editing ? "false" : "true"}>
            <div className="hero-product hero-product--a">
              <img {...imageProps("hero-rhino", "/assets/project-rhino.jpg")} alt="" />
            </div>
            <div className="hero-product hero-product--b">
              <img {...imageProps("hero-horse", "/assets/project-horse.jpg")} alt="" />
            </div>
            <div className="hero-product hero-product--c">
              <img {...imageProps("hero-badge", "/assets/project-club-badge.jpg")} alt="" />
            </div>
            {editable("hero-visual-one", "PRODUCT", "div", "hero__visual-label hero__visual-label--one")}
            {editable("hero-visual-two", "STRUCTURE", "div", "hero__visual-label hero__visual-label--two")}
          </div>

          <div className="hero__scroll-cue">
            <span />
            <i>SCROLL / SPACE</i>
          </div>
        </section>

        <section className="about section-frame" id="about">
          <div className="about__header">
            {editable("about-kicker", "01 / PROFILE", "p", "section-kicker")}
            <h2 className="section-title" data-reveal-title>
              <span className="line-mask">{editable("about-title-1", "DESIGN", "span", "line-inner")}</span>
              <span className="line-mask line-mask--offset">{editable("about-title-2", "THAT", "span", "line-inner")}</span>
              <span className="line-mask">{editable("about-title-3", "BECOMES", "span", "line-inner")}</span>
              <span className="line-mask line-mask--offset">{editable("about-title-4", "PRODUCT.", "span", "line-inner")}</span>
            </h2>
          </div>

          <div className="about__layout">
            <div className="about__portrait">
              <div className="about__portrait-frame">
                <img {...imageProps("about-portrait", "/assets/project-rhino.jpg", "about__portrait-media")} alt="周添瑞的结构产品设计" />
                <div className="about__portrait-caption">
                  {editable("about-stamp", "Porhead", "span")}
                  <b>猪头肉 / TOY / PRODUCT / IP</b>
                </div>
              </div>
            </div>
            <div className="about__copy">
              <p className="about__lede reveal-up">
                {editable(
                  "about-lede",
                  "玩具设计专业出身，习惯从概念出发，同时关注结构、工艺、成本与最终呈现。相比只做“效果图”，更关注一个想法能否进入实体与生产。"
                )}
              </p>
              <p className="about__body reveal-up">
                {editable(
                  "about-body",
                  "我长期关注模型、潮玩与 IP 衍生品。在上海布鲁可科技有限公司实习期间，深度参与多个产品研发项目，覆盖 IP 监修、BOM、包装物料、工厂打样与跨部门协作。下一阶段，我希望进一步进入产品开发、IP 衍生品企划与项目管理。"
                )}
              </p>
              <div className="about__metrics">
                {PROFILE.metrics.map(([value, label], index) => (
                  <div className="about__metric" key={label}>
                    {editable(`metric-${index}-value`, value, "strong")}
                    {editable(`metric-${index}-label`, label, "span")}
                  </div>
                ))}
              </div>
              <div className="about__contacts">
                <a className="contact-link button-hover" href="tel:18971882194">
                  <Phone size={15} /> {editable("contact-phone", "189 7188 2194")}
                </a>
                <a className="contact-link button-hover" href="mailto:2019875211@qq.com">
                  <Mail size={15} /> {editable("contact-email", "2019875211@qq.com")}
                </a>
                <a className="contact-link button-hover" href="#contact">
                  <MessageCircle size={15} /> {editable("contact-wechat", "微信 / 18963972976")}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="projects section-frame" id="projects">
          <div className="projects__header">
            <div>
              {editable("projects-kicker", "02 / SELECTED WORK", "p", "section-kicker")}
              <h2 className="section-title" data-reveal-title>
                <span className="line-mask">{editable("projects-title-1", "FROM", "span", "line-inner")}</span>
                <span className="line-mask line-mask--offset">{editable("projects-title-2", "IDEA", "span", "line-inner")}</span>
                <span className="line-mask">{editable("projects-title-3", "TO OBJECT.", "span", "line-inner")}</span>
              </h2>
            </div>
            <p className="projects__intro reveal-up">
              {editable(
                "projects-intro",
                "每个项目都按产品逻辑重新编排：从问题、洞察与决策，到设计、原型和结果。"
              )}
            </p>
          </div>

          {editing && (
            <div className="projects__add-row">
              <button type="button" className="projects__add-button button-hover" onClick={() => setProjectFormOpen(true)}>
                <Plus size={17} /> 新增项目
              </button>
            </div>
          )}

          <div className="projects__stack">
            {allProjects.map((project, index) => (
              <article
                className={`project-card project-card--${index === 0 ? "feature" : "standard"}`}
                key={project.id}
                onClick={() => openProject(project)}
              >
                <div className="project-card__media">
                  <img {...imageProps(`project-${project.id}`, project.image)} alt={project.cn} loading="lazy" />
                  {editable(`project-${project.id}-number`, project.num, "span", "project-card__number")}
                  {editable(`project-${project.id}-category`, project.category, "span", "project-card__type")}
                </div>
                <div className="project-card__body">
                  <div className="project-card__heading">
                    <h3>{editable(`project-${project.id}-title`, project.title)}</h3>
                    <p>{editable(`project-${project.id}-cn`, project.cn)}</p>
                  </div>
                  <p className="project-card__copy">
                    {editable(`project-${project.id}-summary`, project.summary)}
                  </p>
                  <span className="project-card__link">
                    {editable(`project-${project.id}-link`, "VIEW CASE")} <ArrowUpRight size={17} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            <span>TOY / PRODUCT / IP / STRUCTURE / PROTOTYPE / MANUFACTURING / </span>
            <span>TOY / PRODUCT / IP / STRUCTURE / PROTOTYPE / MANUFACTURING / </span>
          </div>
        </div>

        <section className="capabilities section-frame" id="capabilities">
          <div className="capabilities__header">
            {editable("capabilities-kicker", "03 / CAPABILITIES", "p", "section-kicker")}
            <h2 className="section-title" data-reveal-title>
              <span className="line-mask">{editable("capabilities-title-1", "WHAT", "span", "line-inner")}</span>
              <span className="line-mask line-mask--offset">{editable("capabilities-title-2", "I BRING.", "span", "line-inner")}</span>
            </h2>
            <p className="capabilities__intro reveal-up">
              {editable(
                "capabilities-intro",
                "不是软件清单，而是能进入产品、结构与团队协作的具体能力。"
              )}
            </p>
          </div>
          <div className="strengths__grid">
            {STRENGTHS.map((strength) => {
              const Icon = ICONS[strength.icon] || Box;
              return (
                <article className="strength-card" key={strength.num}>
                  <div className="strength-card__top">
                    <span className="strength-card__num">{strength.num}</span>
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <h3>{editable(`strength-${strength.num}-title`, strength.title)}</h3>
                  <p>{editable(`strength-${strength.num}-copy`, strength.copy)}</p>
                  <span className="strength-card__line" />
                </article>
              );
            })}
          </div>
        </section>

        <section className="contact section-frame" id="contact">
          <div className="contact__block" />
          <div className="contact__inner">
            {editable("contact-kicker", "04 / CONTACT", "p", "section-kicker")}
            <h2 className="contact__title" data-reveal-title>
              <span className="line-mask">{editable("contact-title-1", "LET’S MAKE", "span", "line-inner")}</span>
              <span className="line-mask line-mask--offset">{editable("contact-title-2", "SOMETHING", "span", "line-inner")}</span>
              <span className="line-mask">{editable("contact-title-3", "REAL.", "span", "line-inner")}</span>
            </h2>
            <div className="contact__grid">
              <div className="contact__statement reveal-up">
                <span>OPEN TO</span>
                <p>
                  {editable(
                    "contact-roles",
                    "IP DERIVATIVES PM / TOY PRODUCT / PRODUCT PLANNING / CREATIVE STRATEGY / PROJECT MANAGEMENT"
                  )}
                </p>
              </div>
              <div className="contact__links">
                <a className="contact__big-link button-hover" href="mailto:2019875211@qq.com">
                  {editable("contact-email", "2019875211@qq.com", "span")}
                  <ArrowUpRight size={24} />
                </a>
                <a className="contact__big-link button-hover" href="tel:18971882194">
                  {editable("contact-phone", "189 7188 2194", "span")}
                  <ArrowUpRight size={24} />
                </a>
                <a className="contact__big-link button-hover" href="tel:18963972976">
                  {editable("contact-second-phone", "PHONE:189 6397 2976", "span")}
                  <ArrowUpRight size={24} />
                </a>
              </div>
            </div>
            <div className="contact__footer">
              {editable("contact-location", SITE.location, "span")}
              <span>Porhead — PORTFOLIO 2026</span>
              <span>© 2026</span>
            </div>
          </div>
        </section>
      </main>

      <PageRail onNavigate={navigate} setActiveSection={setActiveSection} />

      <CaseStudy
        project={activeProject}
        onClose={closeProject}
        editing={editing}
        detailImage={resolveAssetPath(image(`case-${activeProject?.id}`, activeProject?.detailImage))}
        onImageEdit={(event) => openImageEditor(event, `case-${activeProject?.id}`, activeProject?.detailImage)}
        onImagePreview={() => setImagePreview(resolveAssetPath(image(`case-${activeProject?.id}`, activeProject?.detailImage)))}
        renderEditable={editable}
        onExportPdf={exportPageToPdf}
      />
    </div>
  );
}

export default App;
