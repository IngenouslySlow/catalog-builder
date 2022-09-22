<script>
	const getJSON = () => {
		return fetch('http://localhost:8000/').then((res) => {
			return res.json();
		});
	};
</script>

<div class="font-montserrat flex flex-col items-center justify-center my-3">
	<h1 class="text-2xl font-bold mb-3">Catalog builder</h1>
	<div class="grid grid-cols-3 gap-4">
		{#await getJSON()}
			<p>Waiting till the data gets back..</p>
		{:then products}
			{#each products as product}
				<div class="h-80 w-80 border-2 border-gray-300 rounded-md">
					<div class="flex flex-col mx-4 my-5">
						<p class="font-medium text-sm text-gray-400">{product.Brand}</p>
						<p class="font-medium text-sm text-gray-900 my-1">{product.Description}</p>
						<div class="flex item-center justify-center my-2">
							<img src={product['Image Link']} alt="product" height="150" width="150" />
						</div>
						<div>
							<p class="font-medium text-sm text-gray-400">Price</p>
							<p class="text-gray-900 font-medium">GBP {product['Case Price']}</p>
						</div>
					</div>
				</div>
			{/each}
		{/await}
	</div>
</div>
