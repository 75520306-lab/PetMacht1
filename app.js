const main = document.getElementById("app-main");
const toast = document.getElementById("toast");

const caregivers = [
  {id:"lucia",name:"Lucía Ramírez",role:"Paseos y cuidado",detail:"Cuidadora verificada · Miraflores, Lima",rating:"4.9",reviews:"36 reseñas",price:"S/ 25",img:"assets/lucia.png",verified:true},
  {id:"diego",name:"Diego Mendoza",role:"Paseador · Primeros auxilios",detail:"Paseador · Primeros auxilios",rating:"4.8",reviews:"28 reseñas",price:"S/ 22",img:"assets/diego.png"},
  {id:"camila",name:"Camila Soto",role:"Cuidado en casa",detail:"Cuidado en casa · 5 años",rating:"5.0",reviews:"18 reseñas",price:"S/ 30",img:"assets/camila.png"}
];

let state = {selected:"lucia"};

function layout(content){
  main.innerHTML = content;
  window.scrollTo({top:0,behavior:"smooth"});
  bind();
}
function showToast(text){
  toast.textContent=text; toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2200);
}
function go(route){
  if(route==="home") renderHome();
  if(route==="search") renderSearch();
  if(route==="profile") renderProfile(state.selected);
  if(route==="reserve") renderReserve();
  if(route==="confirmed") renderConfirmed();
}
function bind(){
  document.querySelectorAll("[data-route]").forEach(b=>b.onclick=()=>go(b.dataset.route));
  document.querySelectorAll("[data-action]").forEach(b=>b.onclick=()=>handleAction(b.dataset.action));
}
function handleAction(action){
  if(action==="login") showToast("Inicio de sesión: próximamente disponible.");
  if(action==="search") go("search");
  if(action==="profile"){state.selected="lucia";go("profile")}
  if(action==="reserve"){go("reserve")}
  if(action==="confirm"){go("confirmed")}
  if(action==="back"){go("search")}
}
function renderHome(){
  layout(`
  <section class="hero">
    <div>
      <div class="eyebrow">Cuidado con confianza, cerca de ti</div>
      <h1>Tu mascota merece lo mejor.</h1>
      <p>Encuentra cuidadores verificados para paseos, baños y cuidado en casa. Fácil, seguro y cerca de ti.</p>
      <div class="hero-actions">
        <button class="primary" data-action="search">Encontrar cuidador →</button>
        <span class="safe">✓ Seguro</span>
      </div>
    </div>
    <div class="hero-art">
      <span class="circle"></span>
      <img src="assets/hero-dog.png" alt="Mascota">
    </div>
  </section>

  <section class="section">
    <div class="section-title"><h3>Todo lo que necesita, en un solo lugar</h3></div>
    <div class="cards4">
      <button class="service-card" data-route="search"><div class="service-icon">🐕</div><strong>Paseos</strong><small>Desde S/ 20</small></button>
      <button class="service-card" data-route="search"><div class="service-icon">🛁</div><strong>Baño</strong><small>Desde S/ 35</small></button>
      <button class="service-card" data-route="search"><div class="service-icon">🏡</div><strong>Cuidado en casa</strong><small>Desde S/ 45</small></button>
      <button class="service-card" data-route="search"><div class="service-icon">🩺</div><strong>Visitas y bienestar</strong><small>Consulta</small></button>
    </div>
  </section>

  <section class="section">
    <div class="section-title"><h3>Cuidadores que se sienten como familia</h3></div>
    <div class="caregivers">
      ${caregivers.map(c=>`
        <button class="caregiver" data-profile="${c.id}">
          <div class="avatar"><img src="${c.img}" alt=""></div>
          <div><strong>${c.name}</strong><span>${c.role}</span><span class="rating">★ ${c.rating} · ${c.reviews}</span></div>
        </button>`).join("")}
    </div>
  </section>`);
  document.querySelectorAll("[data-profile]").forEach(b=>b.onclick=()=>{state.selected=b.dataset.profile;go("profile")});
}

function renderSearch(){
  layout(`
    <section class="page-head">
      <h2>Encuentra a su próximo cuidador</h2>
      <p>Perfiles claros, reseñas reales y reservas sin complicaciones.</p>
    </section>
    <div class="filters">
      <div class="filter"><label>Servicio</label><div class="filter-value">🐕 Paseo de perros⌄</div></div>
      <div class="filter"><label>Ubicación</label><div class="filter-value">Miraflores, Lima⌄</div></div>
      <div class="filter"><label>Fecha</label><div class="filter-value">Hoy, 4:00 p. m.⌄</div></div>
      <button class="smallbtn" data-action="search">Buscar cuidadores</button>
    </div>
    <div class="section-title"><h3>12 cuidadores disponibles</h3></div>
    <div class="results">
      ${caregivers.map(c=>`
        <article class="result">
          <div class="avatar"><img src="${c.img}" alt="${c.name}"></div>
          <div class="result-info">
            <strong>${c.name}</strong>
            <div class="sub">${c.detail} ${c.verified?'<span class="badge">✓ Verificada</span>':''}</div>
            <div class="rating">★ ${c.rating} (${c.reviews})</div>
          </div>
          <div class="price">${c.price} / paseo</div>
          <button class="smallbtn" data-profile="${c.id}">Ver perfil →</button>
        </article>`).join("")}
    </div>`);
  document.querySelectorAll("[data-profile]").forEach(b=>b.onclick=()=>{state.selected=b.dataset.profile;go("profile")});
}

function renderProfile(id){
  const c=caregivers.find(x=>x.id===id)||caregivers[0];
  layout(`
    <button class="back" data-action="back">← Volver a resultados</button>
    <div class="profile-grid">
      <article class="profile-card">
        <div class="profile-top">
          <div class="avatar"><img src="${c.id==="lucia"?"assets/profile-lucia.png":c.img}" alt="${c.name}"></div>
          <div>
            <h2>${c.name}</h2>
            <div class="sub">${c.detail}</div>
            <div class="rating">★ ${c.rating} · ${c.reviews} · 3 años de experiencia</div>
            <span class="badge">✓ Identidad verificada</span>
          </div>
        </div>
        <div class="profile-copy"><h3>Sobre mí</h3><p>Me encanta acompañar a los perros en sus paseos diarios. Mantengo comunicación constante con sus familias y adapto cada paseo a la energía de la mascota.</p></div>
      </article>
      <aside class="booking-card">
        <h3>Reserva este servicio</h3>
        <p>Paseo de perros · 60 minutos</p>
        <div class="booking-price">${c.price}</div>
        <div class="checks"><span>✓ Pago protegido</span><span>✓ Confirmación de reserva</span><span>✓ Reseñas de otros dueños</span></div>
        <button class="primary" data-action="reserve">Elegir fecha y reservar →</button>
      </aside>
    </div>
    <section class="reviews">
      <h3>Lo que dicen otras familias</h3>
      <div class="review-grid">
        <div class="review"><p>“Muy responsable y cariñosa con Bruno.”</p><small>María P. · ★★★★★</small></div>
        <div class="review"><p>“Me envió actualizaciones durante el paseo.”</p><small>Andrés L. · ★★★★★</small></div>
      </div>
    </section>`);
}

function renderReserve(){
  layout(`
    <section class="page-head"><h2>Confirma los detalles</h2><p>Solo unos pasos para que tu mascota esté en buenas manos.</p></section>
    <div class="reserve-layout">
      <article class="reserve-box">
        <h3>Tu reserva</h3>
        <div class="res-person">
          <div class="avatar"><img src="assets/reserve-pet.png" alt=""></div>
          <div><strong>Lucía Ramírez</strong><span>Paseo de perros · 60 minutos</span></div>
        </div>
        <div class="detail-grid">
          <div class="detail"><label>Fecha</label><b>Jueves, 15 de octubre</b></div>
          <div class="detail"><label>Hora</label><b>4:00 p. m.</b></div>
        </div>
        <div class="detail" style="padding-top:17px"><label>Punto de encuentro</label><b>Parque Kennedy, Miraflores</b></div>
        <div class="note"><label>Nota para la cuidadora (opcional)</label><textarea placeholder="Mi perro se emociona al conocer gente nueva..."></textarea></div>
      </article>
      <aside>
        <div class="pay-box">
          <h3>Resumen de pago</h3>
          <div class="pay-line"><span>Paseo de 60 minutos</span><b>S/ 25.00</b></div>
          <div class="pay-line"><span>Protección PetMatch</span><b>Incluida</b></div>
          <div class="pay-line total"><span>Total</span><b>S/ 25.00</b></div>
          <div class="pay-note">🔒 Pago protegido hasta completar el servicio.</div>
          <button class="primary" style="width:100%" data-action="confirm">Confirmar y pagar →</button>
        </div>
        <div class="methods">
          <div class="method"><span class="method-icon">Y</span><b>Yape/banca móvil</b></div>
          <div class="method"><span class="method-icon">P</span><b>Plin</b></div>
          <div class="method"><span class="method-icon">V</span><b>Tarjeta Visa</b></div>
          <div class="method"><span class="method-icon">MC</span><b>Tarjeta Mastercard</b></div>
        </div>
      </aside>
    </div>`);
}

function renderConfirmed(){
  layout(`
    <div class="confirm-layout">
      <article class="confirm-card">
        <div class="confirm-icon"><img src="assets/confirm-dog.png" alt="Mascota"></div>
        <h1>¡Reserva confirmada!</h1>
        <p>Lucía ya tiene los detalles. Tu mascota está un paso más cerca de un día feliz.</p>
        <div class="confirm-detail"><strong>Jueves, 15 de octubre · 4:00 p. m.</strong><b>Paseo con Lucía Ramírez</b></div>
        <button class="primary" style="width:100%" data-route="home">Volver al inicio ↗</button>
        <div style="font-size:8px;color:#8a918c;margin-top:14px">Recibirás actualizaciones de tu reserva.</div>
      </article>
    </div>`);
}

renderHome();
