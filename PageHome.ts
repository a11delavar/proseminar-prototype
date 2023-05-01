import { component, css, html, nothing, state, style } from '@a11d/lit'
import { PageComponent, route } from '@a11d/lit-application'
import data from './database.json'

type Agency = {
	name: string
	applications?: Array<AgencyApplication>
}

type AgencyApplication = {
	name: string
	active?: boolean
}

console.log(JSON.stringify(data.slice(0, 3)))

@component('prototpe-page-home')
@route('/')
export class PageHome extends PageComponent {
	@state() private searchKeyword?: string
	@state() private selectedAgency?: Agency
	@state() private housingBenefitsActive = false

	static override get styles() {
		return css`
			mo-card {
				position: relative;
				height: 200px;
			}

			mo-card:not([disabled]) {
				cursor: pointer;
			}

			.badge {
				background: rgba(0,200,0,0.2);
				border-radius: 4px;
				padding: 4px;
				position: absolute;
				right: 10px;
				top: 10px
			}

			.name {
				text-align: center;
			}
		`
	}

	protected override get template() {
		return html`
			<lit-page heading='Home' fullHeight>
				<mo-splitter direction='horizontal' style='height: 100%; width: 100%'>
					<mo-splitter-item size='75%' minSize='60%'>
						${this.contentTemplate}
					</mo-splitter-item>
					<mo-splitter-item size='25%' maxSize='40%' minSize='20%'>
						${this.bingAiTemplate}
					</mo-splitter-item>
				</mo-splitter>
			</lit-page>
		`
	}

	protected get contentTemplate() {
		if (this.housingBenefitsActive) {
			return html`
				<iframe src='/wohngeld.pdf'></iframe>
			`
		}
		const searchKeyword = this.searchKeyword?.trim().toLowerCase()
		const applications = data.map(agency => this.getAgencyTemplate(agency))
		const applicationsOfSelectedAgency = this.selectedAgency?.applications?.map(a => this.getApplicationTemplate(a))
		const searchResults = !searchKeyword ? nothing
			: [
				...data.filter(agency => agency.name.toLowerCase().includes(searchKeyword)).map(agency => this.getAgencyTemplate(agency)),
				...data.flatMap(agency => agency.applications?.filter(application => application.name.toLowerCase().includes(searchKeyword)).map(application => this.getApplicationTemplate(application))) ?? []
			]

		return html`
			<mo-flex gap='20px'>
				<mo-flex direction='horizontal' alignItems='center' gap='10px'>
					<mo-icon-button icon='arrow_back' @click=${() => this.selectedAgency = undefined}></mo-icon-button>
					<mo-field-search label='Search' style='flex: 1'
						@input=${(e: CustomEvent<string>) => this.searchKeyword = e.detail}
					></mo-field-search>
					<span>Max Mustermann</span>
				</mo-flex>
				<mo-grid columns='repeat(auto-fill, minmax(250px, 1fr))' gap='10px'>
					${searchKeyword ? searchResults : applicationsOfSelectedAgency ?? applications}
				</mo-grid>
			</mo-flex>
		`
	}

	private getAgencyTemplate(agency: Agency) {
		return html`
			<mo-card @click=${() => this.selectedAgency = agency}>
				<mo-flex alignItems='center' justifyContent='center' gap='10px' style='height: 100%'>
					<mo-icon icon='assured_workload'
						style='font-size: 50px; color: var(--mo-color-gray);'
					></mo-icon>
					${!agency.applications?.length ? nothing : html`
						<span class='badge'>${agency.applications?.length} Anträge</span>
					`}
					<span class='name'>${agency.name}</span>
				</mo-flex>
			</mo-card>
		`
	}

	private getApplicationTemplate(application: AgencyApplication) {
		return html`
			<mo-card ?disabled=${!application.active} @click=${() => !application.active ? void 0 : this.housingBenefitsActive = true}>
				<mo-flex alignItems='center' justifyContent='center' gap='10px' style='height: 100%'>
					<mo-icon icon='description'
						style='font-size: 50px; color: var(--mo-color-gray);'
					></mo-icon>
					<span class='badge' ${style({ background: !application.active ? 'rgba(255,0,0,0.2)' : 'rgba(0,200,0,0.2)' })}>
						${!application.active ? 'Inaktiv' : 'Aktiv'}
					</span>
					<span class='name'>${application.name}</span>
				</mo-flex>
			</mo-card>
		`
	}

	protected get bingAiTemplate() {
		return html`
			<mo-card style='flex: 0 0 500px; --mo-card-body-padding: 0px; height: 100%'>
				<iframe src='https://www.bing.com/search?form=MY0291&OCID=MY0291&q=Bing+AI&showconv=1'
					style='height: 100%; width: 100%; border: none;'
					sandbox='allow-scripts allow-same-origin allow-popups allow-forms'
				></iframe>
			</mo-card>
		`
	}
}