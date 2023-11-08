const { default: axios } = require('axios');
const User = require('../models/userModel');
const exceljs = require('exceljs');
// const { Route } = require('express');
const sendEmail = require('./../utils/email');

exports.setLogin = (req, res) => {
  res.status(200).render('login', {
    title: 'User login',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your Account',
  });
};

exports.warehouseOneTwo = async (req, res) => {
  const start_date = req.params.start_date;
  const end_date = req.params.end_date;

  // console.log(start_date, ' start date');
  // console.log(end_date, ' end date');

  //stuffing data set
  const queList = axios.get(
    `https://script.googleusercontent.com/macros/echo?user_content_key=0YpMd488Y7yLLvsuHwJ2Mst9BcpUlTogztGvQeyCWOOIxysZONQeqLj9tBC932OaBs5rR-LDxEGbHmwgh_eVxpFI9q5niLXbm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGPHWZu8M87OcrCNvkRS1kd6vyWHjauVtEg6Ay3CzcuSx85sc1KBZichGKKxhK4BiaO_0Ngrs5JlTY4PZmFyjgqYuU_krHz6eA&lib=MlNzCj5pyppvDPljc-bLYMQhq58PSEe5f`
  );

  //stuffing project details
  const stf_pr_url = axios.get(
    'https://script.googleusercontent.com/macros/echo?user_content_key=z2ppqTIypTUQaE8PIJPVsf131_LEGk3RiZzuE5O2DaUE3L-E6uJXei7Ia2v8oo5WPBUZ09WPhA0r46DB82xVYCwXOasLCUCCm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCEFvS9PqtgTKu-7sYVI2UJNsjQW37nZMxpgGwCrHCgeqOdVfglpgq6VoQzqzf4_p1x6C4q1d1wC1qR40QKVrHg9AsnIDTDdgQ&lib=MlNzCj5pyppvDPljc-bLYMQhq58PSEe5f'
  );

  //stuffing combo chart
  const winner_url = axios.get(
    `https://script.googleusercontent.com/macros/echo?user_content_key=B9sFlPrPwuA42k0IeBwtvnhCOT4VRLyB7loHUXcAqSzJoOb_-hPmiItC2-JBBm18AsKTxlkQfZLSpLL0wKS4CamJnkTrrFv3m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAjXaejaDGFR8P9fpy2Yp00AnUTpzJUFMHMPZSkELZprEN3Ikbf4BX1tA4ZpmuSSXeK8v0e47wkq1M0tkZV4kqaMU6zXABLeyA&lib=MlNzCj5pyppvDPljc-bLYMQhq58PSEe5f`
  );

  const stuff_url = axios.get(
    `https://script.google.com/macros/s/AKfycbwNhSud2iE9-aL-SownkMO6gdZKHdi0bFYPBBRhiHOwtuSjIttxaoXnIouKudcDdfCmpg/exec?start_date=01-06-2023&end_date=01-06-2023`
  );

  const pie_chart_url = axios.get(
    `https://script.googleusercontent.com/macros/echo?user_content_key=AxSaJwXo0wQxKjzIHKIUQk1p5SOuSEQWCmvLf5bFGUBN_Z3qMmLnC5zprKOH6keSzhZKIHV-hhaqFNzFE1AJYkYk3gO5hW6-m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnAKLH1GCfDdq3pRgL6bND0r7fOkTqYasC4kF4RQDTI--KyfG8klPwKjodXMw9ljIacoT1BXgTaYVKwr1UJF4zxzW8hjFFHGcTw&lib=MlNzCj5pyppvDPljc-bLYMQhq58PSEe5f`
  );

  axios
    .all([queList, stf_pr_url, winner_url, stuff_url, pie_chart_url])
    .then(function (data) {
      const questions = data[0];
      const projectDetails = data[1];
      const winners = data[2];
      const stuffingDataSet = data[3];
      const pie_chart = data[4];

      res.render('warehouseOneTwo', {
        stuffingReportWarehouseOneTwo: questions.data.data,
        stuffingProjectDetailsOne: projectDetails.data.data,
        winners_list: winners.data.data,
        stuffingReportWarehouseThree: stuffingDataSet.data.data,
        pieChart: JSON.stringify(pie_chart.data.data),
        isLoaded: true,
        title: 'Quiz Dashboard',
      });
    });
};

exports.warehouseThree = async (req, res) => {
  const start_date = req.params.start_date;
  const end_date = req.params.end_date;

  //stuffing data set
  const stuff_url = axios.get(
    `https://script.google.com/macros/s/AKfycbwNhSud2iE9-aL-SownkMO6gdZKHdi0bFYPBBRhiHOwtuSjIttxaoXnIouKudcDdfCmpg/exec?start_date=${start_date}&end_date=${end_date}`
  );
  const stuff_pr_url = axios.get(
    'https://script.googleusercontent.com/macros/echo?user_content_key=YBiD6qDyLRHAN9qQi_kZeeU7r9cfXRADeuD3MrrpM8RlTU-VWIE4IwbaMkrHv78Na9dhjkI8w2K0bRV_29YQ96YduIp9AQHfm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIys2KwcMpvaW1tDvxIDU5F8xRVvIfvMwKcwpEbkxgqj-U4Tcik2RkCPsWSu1XxTnpEky7NMoliHTARZMXhJX7asnhEVI65Uc9z9Jw9Md8uu&lib=MzFsmOfzUWvArIz4A7cM7CTWkEKQozq2-'
  );
  const carting_pr_url = axios.get(
    'https://script.googleusercontent.com/macros/echo?user_content_key=lS0nz0j7yGT5BJiBhTqKZX43lNAZltOh-iPDQde5cCRAuYBnRrkYR0g5KwWDjJOvyN4wvBrC3BzTJicjIZkbmhWSOBBq6E0Mm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnHBjMRiu73KiM0Ck-sqoKJZEBlMK3RlrcQ80zj0ePngtk-K7bJeMBmwLVql_gzH8j75cApUyhvDfYUk6Lgxr2r9zkLsfhVDiVQ&lib=MV7flkd5QHatBU_iSbV45kUqO0XQ_ydfb'
  );
  const carting_url = axios.get(
    `https://script.google.com/macros/s/AKfycbx09idfdoueiKlUhoqpT8ZzdNfsYtqdfv2qSIQJZoSXO500LjjGi0KFnV4Heo_UJv4d/exec?start_date=${start_date}&end_date=${end_date}`
  );
  const stuff_chart_url = axios.get(
    `https://script.google.com/macros/s/AKfycbzp6clHsiJ_0Y6X8G13t1uqKhSwmnANt0I_V6ThVNI7kEK_Z2zPtc4Mo_pZew7UFgIHVg/exec?start_date=${start_date}&end_date=${end_date}`
  );

  const carting_chart_url = axios.get(
    `https://script.google.com/macros/s/AKfycbyM_goQc1MMWK87-VlXFeI1zIBt4F9GqJsfIDjr8y8XX38oEiyXrJF2V8g5ji3mxk_P/exec?start_date=${start_date}&end_date=${end_date}`
  );
  axios
    .all([
      stuff_url,
      stuff_pr_url,
      carting_pr_url,
      carting_url,
      stuff_chart_url,
      carting_chart_url,
    ])
    .then(function (data) {
      const stuffingDataSet = data[0];
      const projectDetails = data[1];
      const cartingProject = data[2];
      const cartingDataSet = data[3];
      const stuff_chart = data[4];
      const carting_chart = data[5];
      // console.log(stuff_chart.data.data + 'data chart ');

      res.status(200).render('warehouseThree', {
        title: 'Warehouse Three',
        stuffingReportWarehouseThree: stuffingDataSet.data.data,
        stuffingProjectDetails: projectDetails.data.data,
        cartingProjectDetails: cartingProject.data.data,
        cartingDataSetThree: cartingDataSet.data.data,
        stuffingChartThree: JSON.stringify(stuff_chart.data.data),
        cartingChartThree: JSON.stringify(carting_chart.data.data),
      });
    });
};

exports.signUp = (req, res) => {
  res.status(200).render('signUp', {
    title: 'Sign Up',
  });
};

exports.allUsers = async (req, res) => {
  //1) Get Users data from collection
  const users = await User.find();
  const total = await User.find().count();
  const total_active = await User.find({ active: true }).count();
  const total_in_active = await User.find({ active: false }).count();
  console.log(users);
  res.status(200).render('allUsers', {
    users,
    total,
    total_active,
    total_in_active,
    title: 'Users',
  });
};

exports.myHome = (req, res) => {
  res.status(200).render('base', {
    title: 'Home ',
  });
};

exports.generateReport = async (req, res) => {
  let workbook = new exceljs.Workbook();

  const sheet = workbook.addWorksheet('Report');
  var { data } = await axios.get(
    'https://script.googleusercontent.com/macros/echo?user_content_key=FA9QDc1-rjGla7y-rTcgxhpQZhU0uQpf--Vmy9screnV9fde-S9JleLbMAH52bZZE4gWTb9SCz57RM5QvED8uJjmplmUQ6MLm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNfonpGE93rUsBOcaK0IRkO5fg5SKiVPkbAZmc-wjwKVb3hx7kkq4Qcgj5HTizO1fu9U-_d1QR6NTetkGhq6al5Oid3WTkxHSg&lib=MW8rkVqNzYSQZl_gZuXusDUqO0XQ_ydfb'
  );

  sheet.columns = [{ header: 'consolidator' }, { header: 'status' }];
  await data.data.map((value, index) => {
    console.log(value);
    sheet.addRow(value);
  });
  // sheet.addRow([2, 'Mary Sue', 22]);
  // for (var rowItem in data.data) {
  //   sheet.addRow(data.data[rowItem]);
  // }
  res.setHeader(
    'Content-type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );

  res.setHeader('Content-Disposition', 'attachment;filename=report.xlsx');

  // data.data.map((file) => {
  //   // console.log(file);
  //   sheet.addRow({ consolidator: 'Damco' });
  // });
  // data.data.map((value, index) => {
  //   console.log(value.consolidator + ' myvalue');
  //   console.log(index + 'idx');
  //   sheet.addRow({
  //     consolidator: value.consolidator,
  //   });
  // });
  workbook.xlsx.write(res);
};

exports.getLoader = (req, res) => {
  res.status(200).render('loader', {
    title: 'loader',
  });
};
