import { useEffect, useState } from "react";
import { ACTIVATED, GH_OWNER, GH_REPO, GH_TOKEN } from "../contentScript/const";
import { log } from "../contentScript/utils";

function App() {
  const [seePassword, setSeePassword] = useState(false);
  const [formValues, setFormValues] = useState(() => ({
    gh_token: GH_TOKEN(),
    repo: GH_REPO(),
    owner: GH_OWNER(),
    activated: ACTIVATED() ? "true" : "false",
  }));
  function handleChanges(
    changes: { [key: string]: chrome.storage.StorageChange },
    areaName: "local" | "sync" | "managed" | "session"
  ) {
    log("CHANGES IN LOCAL STORAGE received in popup: ", changes);
    if (areaName !== "local") return;
    if (changes.gh_token)
      setFormValues((prev) => ({
        ...prev,
        gh_token: changes.gh_token.newValue,
      }));
    if (changes.repo)
      setFormValues((prev) => ({ ...prev, repo: changes.repo.newValue }));
    if (changes.owner)
      setFormValues((prev) => ({ ...prev, owner: changes.owner.newValue }));
    if (changes.activated)
      setFormValues((prev) => ({
        ...prev,
        activated: changes.activated.newValue ? "true" : "false",
      }));
  }
  useEffect(() => {
    log("Mounted!");
    chrome.storage.onChanged.addListener(handleChanges);
    return () => {
      chrome.storage.onChanged.removeListener(handleChanges);
    };
  }, []);
  return (
    <form
      style={{}}
      className="!lf-flex !lf-flex-col !lf-gap-3 !lf-p-3 !lf-bg-white !lf-rounded-lg lf-shadow-lg"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const { gh_token, repo, owner, activated } =
          Object.fromEntries(formData);
        log(gh_token, repo, owner, activated);
        await chrome.storage.local.set({
          gh_token,
          repo,
          owner,
          activated: activated === "true" ? true : false,
        });
        alert(
          "Data saved! -> " +
            JSON.stringify(
              await chrome.storage.local.get([
                "gh_token",
                "repo",
                "owner",
                "activated",
              ])
            )
        );
      }}
    >
      <fieldset>
        <label htmlFor="gh_token">Github token</label>
        <div className="!lf-flex lf-gap-3">
          <input
            defaultValue={formValues.gh_token}
            type={seePassword ? "text" : "password"}
            name="gh_token"
            id="gh_token"
            placeholder="ghp_..."
          />
          <button type="button" onClick={() => setSeePassword(!seePassword)}>
            {seePassword ? "Hide" : "Show"}
          </button>
        </div>
      </fieldset>
      <fieldset>
        <label htmlFor="repo">Github Repository</label>
        <input
          defaultValue={formValues.repo}
          type="text"
          placeholder="live-feedback"
          name="repo"
          id="repo"
        />
      </fieldset>
      <fieldset>
        <label htmlFor="owner">Github Repository Owner</label>
        <input
          defaultValue={formValues.owner}
          type="text"
          placeholder="JulianKominovic"
          name="owner"
          id="owner"
        />
      </fieldset>
      <fieldset>
        <legend>Activate or deactivate extension:</legend>

        <div>
          <input
            type="radio"
            id="true"
            name="activated"
            value="true"
            defaultChecked={formValues.activated === "true"}
          />
          <label htmlFor="true">Activate</label>
        </div>

        <div>
          <input
            type="radio"
            id="false"
            name="activated"
            value="false"
            defaultChecked={formValues.activated === "false"}
          />
          <label htmlFor="false">Deactivate</label>
        </div>
      </fieldset>

      <button
        type="submit"
        className="!lf-bg-blue-500 !lf-text-white !lf-py-2 !lf-px-4 lf-rounded-md"
      >
        Save
      </button>
    </form>
  );
}

export default App;
