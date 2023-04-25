import { component, html } from '@a11d/lit'
import { PageComponent, route } from '@a11d/lit-application'
import data from './database.json'

@component('prototpe-page-home')
@route('/')
export class PageHome extends PageComponent {
	protected override get template() {
		return html`
			<lit-page heading='Home' fullHeight>
				<mo-flex direction='horizontal' gap='12px' style='height: 100%'>
					<mo-flex gap='20px' style='flex: 1'>
						<mo-flex direction='horizontal' alignItems='center' gap='10px'>
							<mo-field-search label='Search' style='flex: 1'></mo-field-search>
							<span>Max Mustermann</span>
						</mo-flex>
						<mo-grid columns='repeat(auto-fill, minmax(250px, 1fr))' gap='10px'>
							${data.map(item => html`
								<mo-card style='height: 200px'>
									${item.name}
								</mo-card>
							`)}
						</mo-grid>
					</mo-flex>
					<mo-card style='flex: 0 0 500px; --mo-card-body-padding: 0px'>
						<mo-flex style='height: 100%'>
							<iframe src='https://www.bing.com/search?form=MY0291&OCID=MY0291&q=Bing+AI&showconv=1' style='height: 100%'
								sandbox='allow-scripts allow-same-origin allow-popups allow-forms'
							></iframe>
						</mo-flex>
					</mo-card>
				</mo-flex>
			</lit-page>
		`
	}
}