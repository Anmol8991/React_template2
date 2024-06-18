import Swal from "sweetalert2";
import { updateWalletAddress } from "../api/utilityApi";
import { notify } from "./toastify";
export const truncateString = (string) => {
  return <>{string ? `${string.slice(0, 4)}...${string.slice(-4)}` : ""}</>;
};

export const truncateDescription = (string) => {
  return <>{string.length > 80 ? string.substring(0, 80) + "..." : string}</>;
};

export function roundToNearestWholeNumber(value) {
  if (value >= 1 && value < 2) {
    return 2;
  } else {
    return Math.round(value);
  }
}

export const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    setTimeout(() => {
      notify("Copied to clipboard", true);
    }, 1000);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

export const getActivityRoutes = (categoryInfo) => {
  switch (categoryInfo?.name.toLowerCase()) {
    case "learning":
      return `/activities/learn-activity/${categoryInfo.id}`;
    case "events":
      return `/activities/event-activity/${categoryInfo.id}`;
    case "uploads":
      return `/activities/upload-activity/${categoryInfo.id}`;
    default:
      return "/activities/activity-detail/" + "646b629079636c699751908c";
  }
};

// export const getWalletAddress = async (
//   setWalletAddress,
//   setUser,
//   replaceWallet,
//   setReplaceWallet
// ) => {
//   const existingWalletId = JSON.parse(
//     localStorage.getItem("user_data")
//   ).walletId;
//   let notExist = true;

//   function sendMessageToExtension() {
//     return new Promise((resolve) => {
//       window.addEventListener("message", function handleMessage(event) {

//         if (
//           event.source === window &&
//           event.data.type === "GET_WALLET_ADDRESS_RETURN"
//         ) {
//           const payload = event.data.payload;
//           console.log(payload);
//           if (payload.accountExist && payload.data !== false) {
//             if (existingWalletId !== payload.data && setReplaceWallet) {
//               setReplaceWallet({ message: "show", walletId: payload.data });
//             } else {
//               sessionStorage.setItem("walletAddress", payload.data);
//               if (setUser) {
//                 setUser((current) => {
//                   return { ...current, walletId: payload.data };
//                 });
//               }
//               setWalletAddress(payload.data);
//               notify("Successfully connected to TWIN wallet", true);
//               updateWalletAddress(payload.data)
//                 .then(() => {
//                   resolve();
//                 })
//                 .catch((e) => {
//                   notify(e.message, false);
//                   resolve();
//                 });
//             }
//           } else {
//             console.log(`please create account.`);
//             notify("Failed to connect to wallet", false);
//             resolve();
//           }

//           window.removeEventListener("message", handleMessage);
//         }
//         // window.removeEventListener("message", handleMessage);
//       });

//       window.postMessage({ type: "GET_WALLET_ADDRESS" }, "*");
//     });
//   }

//   await sendMessageToExtension();
// };

export const getWalletAddress = async (
  setWalletAddress,
  setUser,
  replaceWallet,
  setReplaceWallet
) => {
  const existingWalletId = JSON.parse(
    localStorage.getItem("user_data")
  ).walletId;
  let notExist = true;

  function checkWallet() {
    return new Promise((resolve) => {
      window.addEventListener("message", function handleMessage(event) {
        if (
          event.source === window &&
          event.data.type === "WALLET_EXIST_RETURN"
        ) {
          notExist = false;
        }
      });
      window.postMessage({ type: "WALLET_EXIST" }, "*");
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }

  await checkWallet();

  if (notExist) {
    // notify("TWIN wallet extension not installed", false);
    // setTimeout(() => {
    //   window.open("https://drive.google.com/drive/folders/1KrzicAZb8bVUDDnDctZZwd7oAr9gKavB?usp=drive_link", "_blank", "noopener");
    // }, 2000);

    Swal.fire({
      title: "Wallet not found",
      text: "Wallet extension is not installed in your browser, please download the wallet and install it first",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Download",
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(
          "https://drive.google.com/drive/folders/1KrzicAZb8bVUDDnDctZZwd7oAr9gKavB?usp=drive_link",
          "_blank",
          "noopener"
        );
      }
    });
  } else {
    function sendMessageToExtension() {
      return new Promise((resolve) => {
        window.addEventListener("message", function handleMessage(event) {
          if (
            event.source === window &&
            event.data.type === "GET_WALLET_ADDRESS_RETURN"
          ) {
            const payload = event.data.payload;
            if (payload.accountExist && payload.data !== false) {
              if (existingWalletId !== payload.data && setReplaceWallet && existingWalletId) {
                setReplaceWallet({ message: "show", walletId: payload.data });
              } else {
                sessionStorage.setItem("walletAddress", payload.data);
                if (setUser) {
                  setUser((current) => {
                    return { ...current, walletId: payload.data };
                  });
                }
                setWalletAddress(payload.data);
                notify("Successfully connected to TWIN wallet", true);
                updateWalletAddress(payload.data)
                  .then(() => {
                    resolve();
                  })
                  .catch((e) => {
                    notify(e.message, false);
                    resolve();
                  });
              }
            } else {
              console.log("Please create an account.");
              notify("Failed to connect to wallet", false);
              resolve();
            }

            window.removeEventListener("message", handleMessage);
          }
        });

        window.postMessage({ type: "GET_WALLET_ADDRESS" }, "*");
        setTimeout(() => {
          resolve();
        }, 100);
      });
    }

    await sendMessageToExtension();
  }
};
