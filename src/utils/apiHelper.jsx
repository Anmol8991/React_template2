import {
  updateClientStatus,
  updateProtocolStatus,
  updateUserStatus,
} from "../api/dectecApi";

import Swal from "sweetalert2";

export const handleStatusUpdate = async (
  type,
  id,
  updateHandler,
  name,
  status
) => {
  console.log(type);
  if (type === "user") {
    let stat;
    if (status === true) {
      stat = "deactivate";
    } else {
      stat = "activate";
    }
    Swal.fire({
      // title: 'Are you sure?',
      html:
        '<h4 style="color:#424345">Are you sure?</h4>' +
        '<p style="color:#424345" className="mb-0">This will ' +
        stat +
        " the user <b>" +
        name +
        "</b>.</p>",
      // icon: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        cancelButton: "btn btn-light ms-2 px-3",
        confirmButton: "btn btn-danger px-4",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        updateUserStatus({ userId: id })
          .then((res) => {
            if (res.success) {
              // notify(res.message, true);
              Swal.fire({
                // icon:'success',
                html:
                  '<p style="color:#424345" className="mb-0 mt-3">' +
                  res.message +
                  "</p>",
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: "OK",
              });
              updateHandler();
            } else {
              console.log(res);
              // notify(res.message, false);
              Swal.fire({
                // icon:'error',
                html:
                  '<p style="color:#424345" className="mb-0 mt-3">' +
                  res.message +
                  "</p>",
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: "OK",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            // notify(err.message, false);
            Swal.fire({
              // icon:'error',
              html:
                '<p style="color:#424345" className="mb-0 mt-3">' +
                res.message +
                "</p>",
              showCloseButton: true,
              showCancelButton: false,
              focusConfirm: false,
              confirmButtonText: "OK",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  } else if (type === "client") {
    Swal.fire({
      // title: 'Are you sure?',
      html:
        '<h4 style="color:#424345">Are you sure?</h4>' +
        '<p style="color:#424345" className="mb-0 mt-3">This will delete the client <b>' +
        name +
        "</b>.</p>",
      // icon: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        cancelButton: "btn btn-light ms-2 px-3",
        confirmButton: "btn btn-danger px-4",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        updateClientStatus({ clientId: id })
          .then((res) => {
            if (res.success) {
              // notify(res.message, true);
              Swal.fire({
                // icon:'success',
                html:
                  '<p style="color:#424345" className="mb-0 mt-3">' +
                  res.message +
                  "</p>",
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: "OK",
              });
              updateHandler();
            } else {
              console.log(res);
              // notify(res.message, false);
              Swal.fire({
                // icon:'error',
                html:
                  '<p style="color:#424345" className="mb-0 mt-3">' +
                  res.message +
                  "</p>",
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: "OK",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            // notify(err.message, false);
            Swal.fire({
              // icon:'error',
              html:
                '<p style="color:#424345" className="mb-0 mt-3">' +
                res.message +
                "</p>",
              showCloseButton: true,
              showCancelButton: false,
              focusConfirm: false,
              confirmButtonText: "OK",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  } else if (type === "protocol") {
    Swal.fire({
      // title: 'Are you sure?',
      html:
        '<h4 style="color:#424345">Are you sure?</h4>' +
        '<p style="color:#424345" className="mb-0">This will delete protocol <b>' +
        name +
        "</b>.</p>",
      // icon: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        cancelButton: "btn btn-light ms-2 px-3",
        confirmButton: "btn btn-danger px-4",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        updateProtocolStatus({ protocolId: id })
          .then((res) => {
            if (res.success) {
              // notify(res.message, true);
              Swal.fire({
                // icon:'success',
                html:
                  '<p style="color:#424345" className="mb-0 mt-3">' +
                  res.message +
                  "</p>",
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: "OK",
              });
              updateHandler();
            }
          })
          .catch((err) => {
            console.log(err);
            // notify(err.message, false);
            Swal.fire({
              // icon:'error',
              html:
                '<p style="color:#424345" className="mb-0 mt-3">' +
                res.message +
                "</p>",
              showCloseButton: true,
              showCancelButton: false,
              focusConfirm: false,
              confirmButtonText: "OK",
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
};

export const handleEdit = async (type, id, name) => {
  if (type === "client") {
    Swal.fire({
      // title: 'Are you sure?',
      html:
        '<h4 style="color:#424345">Are you sure?</h4>' +
        '<p style="color:#424345" className="mb-0 mt-3">You want to update the details of the client <b>' +
        name +
        "</b>.</p>",
      // icon: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        cancelButton: "btn btn-light ms-2 px-3",
        confirmButton: "btn btn-danger px-4",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        location.replace(`/edit-client/${id}`);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
};

export const handleEditClient = async (type, id, name, func) => {
  if (type === "client") {
    Swal.fire({
      // title: 'Are you sure?',
      html:
        '<h4 style="color:#424345">Are you sure?</h4>' +
        '<p style="color:#424345" className="mb-0 mt-3">You want to update the details of the client <b>' +
        name +
        "</b>.</p>",
      // icon: 'warning',
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        cancelButton: "btn btn-light ms-2 px-3",
        confirmButton: "btn btn-danger px-4",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        func();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
};
