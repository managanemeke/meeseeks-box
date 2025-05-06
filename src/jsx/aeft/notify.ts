export const notify = (text: string) => {
  const window = new Window("dialog", "Notification");
  const textArea = window.add("edittext", undefined, "", {multiline: true});
  textArea.preferredSize = [300, 100];
  textArea.text = text;
  window.show();
};
