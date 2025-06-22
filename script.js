// script.js

const CLIENT_DATA = {
  "client1": {
    name: "John Doe",
    title: "Graphic Designer",
    phone: "+1 234 567 8901",
    email: "john@example.com",
    address: "123 Design Lane, NYC",
    mapEmbed: "https://maps.google.com/maps?q=Design+Lane,+NYC&t=&z=13&ie=UTF8&iwloc=&output=embed",
    services: ["Branding", "UI/UX Design", "Print Design"],
    social: {
      instagram: "https://instagram.com/johndesigns",
      telegram: "https://t.me/john_doe",
      facebook: "",
      tiktok: "",
      website: "https://johndesigns.com"
    },
    backgroundImage: "photos/client1-bg.jpg",
    photo: "photos/client1.jpg"
  },
  "client2": {
    name: "Jane Smith",
    title: "Marketing Strategist",
    phone: "+1 987 654 3210",
    email: "jane@example.com",
    address: "456 Strategy Ave, LA",
    mapEmbed: "https://maps.google.com/maps?q=Strategy+Ave,+LA&t=&z=13&ie=UTF8&iwloc=&output=embed",
    services: ["Digital Marketing", "Social Media", "SEO Strategy"],
    social: {
      instagram: "https://instagram.com/janesmithmarketing",
      telegram: "",
      facebook: "",
      tiktok: "",
      website: "https://janemarketingagency.com"
    },
    backgroundImage: "photos/client2-bg.jpg",
    photo: "photos/client2.jpg"
  }
};

function getClientId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id') || 'default';
}

function loadData(client) {
  // Update background image
  document.getElementById("heroHeader").style.backgroundImage = 
    `url('${client.backgroundImage}'), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`;

  // Update profile photo
  document.getElementById("clientPhoto").src = client.photo;

  // Update name & title
  document.getElementById("clientName").textContent = client.name;
  document.getElementById("clientTitle").textContent = client.title;

  // Update contact links
  document.getElementById("clientPhoneLink").href = "tel:" + client.phone;
  document.getElementById("clientEmailLink").href = "mailto:" + client.email;
  document.getElementById("clientMapLink").href = `https://maps.google.com/?q=${encodeURIComponent(client.address.replace(/\s+/g, '+'))}`;

  // Update contact info text
  document.getElementById("infoPhone").textContent = client.phone;
  document.getElementById("infoAddress").textContent = client.address;
  document.getElementById("infoEmail").textContent = client.email;

  // Update map iframe
  document.getElementById("mapIframe").src = client.mapEmbed;
  document.getElementById("mapAddress").textContent = client.address;

  // Update services
  const serviceList = document.getElementById("serviceList");
  serviceList.innerHTML = "";
  client.services.forEach(service => {
    const li = document.createElement("li");
    li.textContent = service;
    serviceList.appendChild(li);
  });

  // Update social media
  document.getElementById("instagram").href = client.social.instagram || "#"; 
  document.getElementById("telegram").href = client.social.telegram || "#";
  document.getElementById("facebook").href = client.social.facebook || "#";
  document.getElementById("tiktok").href = client.social.tiktok || "#";
  document.getElementById("website").href = client.social.website || "#";
}

// Load client data
const clientId = getClientId();
const client = CLIENT_DATA[clientId] || CLIENT_DATA.client1;

loadData(client);

// Animate logo on load
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('heroLogo').classList.add('loaded');
  }, 100);
});

// Scroll animation
const stickyHeader = document.getElementById('stickyHeader');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || window.pageYOffset;

  if (scrollTop > 0) {
    const opacity = Math.max(1 - scrollTop / 200, 0);
    document.getElementById('heroLogo').style.opacity = opacity;
  }

  if (scrollTop > 100) {
    stickyHeader.classList.add('show');
  } else {
    stickyHeader.classList.remove('show');
  }
});

// Generate vCard
function generateVCF(client) {
  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${client.name}
N:Name;${client.name};;;
TEL;TYPE=WORK,VOICE:${client.phone}
EMAIL:${client.email}
URL:${client.social.website || ""}
ORG:Your Company
TITLE:${client.title}
END:VCARD`;

  const blob = new Blob([vCard], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${client.name.replace(/\s+/g, '_')}.vcf`;
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById("saveContactBtn").addEventListener("click", function(e) {
  e.preventDefault();
  generateVCF(client);
});