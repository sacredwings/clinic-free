import TemplatesMain from "../components/template/main"

export default function () {
  return <TemplatesMain title={'Главная страница'}>
      <h1>Главная страница</h1>
  </TemplatesMain>

}
export async function getServerSideProps ({query, req}) {
  return {
    props: {}
  }
}