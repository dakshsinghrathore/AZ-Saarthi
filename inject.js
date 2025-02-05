(() => {
    const { open, send } = XMLHttpRequest.prototype;
  
    XMLHttpRequest.prototype.open = function (...args) {
      this._url = args[1];
      return open.apply(this, args);
    };
  
    XMLHttpRequest.prototype.send = function (body) {
      this.addEventListener("load", () => {
        window.dispatchEvent(new CustomEvent("xhrDataFetched", {
          detail: { url: this._url, status: this.status, response: this.response }
        }));
      });
  
      return send.apply(this, arguments);
    };
  })();
  










