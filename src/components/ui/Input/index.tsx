import styles from "./styles.module.scss";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

//Sobreescrevendo o Input InputHTMLAttributes, extendendo dele mesmo, e passando um generic do tipo HTMLINPUTELEMENT
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function Input({ ...children }: InputProps) {
  return <input className={styles.input} {...children} />;
}

export function TextArea({ ...children }: TextAreaProps) {
  return <textarea className={styles.input} {...children}></textarea>;
}
