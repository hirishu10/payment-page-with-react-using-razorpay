/**
 *
 * @param {*} src - uri for load the script
 * @returns Promise based function which return success or failed
 *
 */
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve("success");
    };
    script.onerror = () => {
      reject("Something went wrong");
    };
    document.body.appendChild(script);
  });
};

export default loadScript;
