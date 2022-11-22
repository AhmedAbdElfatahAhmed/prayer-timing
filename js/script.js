const selectCityContainerElm = document.querySelector(".form-select");
const prayerTimingElm = document.getElementById("prayer-timing-wrapper");
let egypyCities = [
  {
    arCity: "الإسكندرية",
    enCity: "Alexandria",
  },
  {
    arCity: "الإسماعيلية",
    enCity: "Ismailia",
  },
  {
    arCity: "أسوان",
    enCity: "Aswan",
  },

  {
    arCity: "أسيوط",
    enCity: "Asyut",
  },

  {
    arCity: "الأقصر",
    enCity: "Luxor",
  },

  {
    arCity: "البحر الأحمر",
    enCity: "RedSea",
  },

  {
    arCity: "البحيرة",
    enCity: "Beheira",
  },

  {
    arCity: "بني سويف",
    enCity: "BeniSuef",
  },

  {
    arCity: "بورسعيد",
    enCity: "PortSaid",
  },

  {
    arCity: "جنوب سيناء",
    enCity: "SouthSinai",
  },

  {
    arCity: "الجيزة",
    enCity: "Giza",
  },

  {
    arCity: "الدقهلية",
    enCity: "Dakahlia",
  },
  {
    arCity: "دمياط",
    enCity: "Damietta",
  },
  {
    arCity: "سوهاج",
    enCity: "Sohag",
  },
  {
    arCity: "السويس",
    enCity: "Suez",
  },
  {
    arCity: "الشرقية",
    enCity: "AlSharqia	",
  },
  {
    arCity: "شمال سيناء",
    enCity: "NorthSinai",
  },

  {
    arCity: "الغربية",
    enCity: "Gharbia",
  },

  {
    arCity: "الفيوم",
    enCity: "Faiyum",
  },

  {
    arCity: "القاهرة",
    enCity: "Cairo",
  },

  {
    arCity: "القليوبية",
    enCity: "Qalyubia",
  },
  {
    arCity: "قنا",
    enCity: "Qena",
  },

  {
    arCity: "كفر الشيخ",
    enCity: "Kafrel-Sheikh	",
  },
  {
    arCity: "مطروح",
    enCity: "Matrouh",
  },

  {
    arCity: "المنوفية",
    enCity: "Monufia",
  },
  {
    arCity: "المنيا",
    enCity: "Minya",
  },

  {
    arCity: "الوادي الجديد",
    enCity: "NewValley",
  },
];

egypyCities.map((city) => {
  selectCityContainerElm.innerHTML += `<option value=${city.enCity}>${city.arCity}</option>
    `;
});

selectCityContainerElm.addEventListener("change", () => {
  const city =
    selectCityContainerElm.options[selectCityContainerElm.selectedIndex].text;
  getPrayerTiming(selectCityContainerElm.value, city);
});
const getPrayerTiming = (value, city) => {
  axios
    .get(`https://api.aladhan.com/v1/timingsByCity?city=${value}&country=EG`)
    .then((response) => {
      const { timings, date } = response.data.data;
      const Fajr = timings.Fajr;
      const Sunrise = timings.Sunrise;
      const Dhuhr = convertTimingTo12Hours(timings.Dhuhr);
      const Asr = convertTimingTo12Hours(timings.Asr);
      const Maghrib = convertTimingTo12Hours(timings.Maghrib);
      const Isha = convertTimingTo12Hours(timings.Isha);
      displayPrayerTiming(Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha);
      console.log(date.gregorian.date);
      console.log(date.hijri.date);
      console.log(date.hijri.weekday.ar);
      console.log(city);
    })
    .catch((err) => {
      console.log(err);
    });
};
getPrayerTiming("Alexandria", "الإسكندرية");

const displayPrayerTiming = (Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha) => {
  prayerTimingElm.innerHTML = `
  <div class="col-md-4">
  <div class="prayer-timing bg-success text-white rounded-3 mb-5">
    <span class="prayer mb-3">الفجر</span>
    <span class="timing">${Fajr}</span>
  </div>
</div>

<div class="col-md-4">
  <div class="prayer-timing bg-success text-white rounded-3 mb-5">
    <span class="prayer mb-3">الشروق</span>
    <span class="timing">${Sunrise}</span>
  </div>
</div>

<div class="col-md-4">
<div class="prayer-timing bg-success text-white rounded-3 mb-5">
  <span class="prayer mb-3">الظهر</span>
  <span class="timing">${Dhuhr}</span>
</div>
</div>


<div class="col-md-4">
<div class="prayer-timing bg-success text-white rounded-3">
<span class="prayer mb-3">العصر</span>
<span class="timing">${Asr}</span>
</div>
</div>

<div class="col-md-4">
<div class="prayer-timing bg-success text-white rounded-3">
<span class="prayer mb-3">المغرب</span>
<span class="timing">${Maghrib}</span>
</div>
</div>

<div class="col-md-4">
<div class="prayer-timing bg-success text-white rounded-3">
<span class="prayer mb-3">العشاء</span>
<span class="timing">${Isha}</span>
</div>
</div>

`;
};

const convertTimingTo12Hours = (time) => {
  return Number(time.slice(0, 2)) > 12
    ? "0" + (Number(time.slice(0, 2)) - 12) + time.slice(2)
    : time;
};
