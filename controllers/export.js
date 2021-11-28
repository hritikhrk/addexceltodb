const XLSX = require("xlsx");
const async = require("async");
const Candidate = require("../model/candidate");
const upload = require("./upload");

const exportController = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    }
    try {
      if (!req.file) {
        return res.status(400).render("home", { message: "no files uploaded" });
      }
      const excelFilePath = `./public/uploads/${req.file.filename}`;
      console.log(`./public/uploads/${req.file.filename}`);
      const excelFileName = req.file.filename;
      const array = excelFileName.split(".");
      const fileExtension = array[array.length - 1];
      if (!(fileExtension === "xlsx" || fileExtension === "xls")) {
        return res
          .status(400)
          .render("home", { message: "invalid file format" });
      }
      const workbook = XLSX.readFile(excelFilePath);
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const excelToJson = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      const excelData = JSON.parse(JSON.stringify(excelToJson));
      const fields = [
        "Name of the Candidate",
        "Email",
        "Mobile No.",
        "Date of Birth",
        "Work Experience",
        "Resume Title",
        "Current Location",
        "Postal Address",
        "Current Employer",
        "Current Designation",
      ];
      console.log(fields);

      async.eachSeries(
        excelData,
        async function (e, cb) {
          // console.log(e);
          const old_c = await Candidate.findOne({ email: e[fields[1]] });
          if (old_c) {
            console.log(
              `duplicate record : ${old_c.email} already registered.`
            );
          } else {
            if (!(e[fields[0]] && e[fields[1]])) {
              console.log(`Name & Email both are required.`);
            } else {
              const c = new Candidate({
                name: e[fields[0]],
                email: e[fields[1]],
                phone: e[fields[2]],
                dob: e[fields[3]],
                woe: e[fields[4]],
                resume_title: e[fields[5]],
                curr_location: e[fields[6]],
                postal_addr: e[fields[7]],
                curr_employer: e[fields[8]],
                curr_designation: e[fields[9]],
              });
              await c.save();
              console.log(`succesfully saved record ${c.email}!!!`);
            }
          }
          return cb();
        },
        function (err) {
          if (err) {
            console.log(err.message);
          } else {
            console.log("Export completed.");
            return res.status(200).render("success", {
              message: "Data exported successfully",
              imageUrl: "/assets/success.png",
            });
          }
        }
      );
    } catch (err) {
      return console.log(err.message);
    }
  });
};

module.exports = exportController;
