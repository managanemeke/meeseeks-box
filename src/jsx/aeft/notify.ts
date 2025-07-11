export const notify = (text: string) => {
  /* @ts-ignore */
  const window = new Window("dialog", "Notification");
  /* @ts-ignore */
  const textArea = window.add("edittext", undefined, "", {multiline: true});
  textArea.preferredSize = [300, 100];
  textArea.text = text;
  /* @ts-ignore */
  window.show();
};
